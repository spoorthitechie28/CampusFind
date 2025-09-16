import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// --- Create item mutation ---
export const createItem = mutation({
  args: {
    type: v.union(v.literal('lost'), v.literal('found')),
    itemName: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('You must be logged in.');

    // Get image URL if a file was uploaded
    let imageUrl = null;
    if (args.storageId) {
      imageUrl = await ctx.storage.getUrl(args.storageId);
    }

    // Insert item into the Convex database
    await ctx.db.insert('items', {
      type: args.type,
      itemName: args.itemName,
      category: args.category,
      description: args.description,
      location: args.location,
      imageUrl,
      clerkUserId: identity.subject,
      userName: identity.name,
      userEmail: identity.email,
      status: 'Available',
    });
  },
});

// --- Get all items query ---
export const getItems = query({
  handler: async (ctx) => {
    return await ctx.db.query('items').order('desc').collect();
  },
});


// --- Generate secure upload URL ---
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
}); // <-- This closing brace was missing

// --- Get items for the logged-in user ---
export const getMyItems = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Return an empty array if the user is not logged in
      return [];
    }

    // Fetch items where the clerkUserId matches the logged-in user's ID
    return await ctx.db
      .query('items')
      .withIndex('by_clerkUserId', (q) => q.eq('clerkUserId', identity.subject))
      .order('desc')
      .collect();
  },
});