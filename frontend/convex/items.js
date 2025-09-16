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
});

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

// --- Get a single item's details ---
export const getItem = query({
  args: { itemId: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.itemId);
  },
});

// --- Send a message ---
export const sendMessage = mutation({
  args: {
    text: v.string(),
    itemId: v.id("items"),
    toUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be logged in to send a message.");

    // This logic allows replying. A user can send a message
    // to another user, but not to themselves if they are the original sender.
     if (identity.subject === args.toUserId) {
       const item = await ctx.db.get(args.itemId);
       // The owner of an item cannot initiate a conversation on their own item.
       if(item.clerkUserId === identity.subject) {
         throw new Error("You cannot initiate a message on your own item.");
       }
    }

    await ctx.db.insert("messages", {
      text: args.text,
      itemId: args.itemId,
      fromUserId: identity.subject,
      toUserId: args.toUserId,
    });
  },
});

// --- FINAL VERSION for two-way chat ---
export const getMessagesForItem = query({
  args: {
    itemId: v.id("items"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found.");

    const allMessages = await ctx.db
      .query("messages")
      .withIndex("by_itemId", (q) => q.eq("itemId", args.itemId))
      .collect();

    if (item.clerkUserId === identity.subject) {
      return allMessages;
    }

    return allMessages.filter(
      (msg) =>
        (msg.fromUserId === identity.subject && msg.toUserId === item.clerkUserId) ||
        (msg.fromUserId === item.clerkUserId && msg.toUserId === identity.subject)
    );
  },
});

// --- NEW: Update an item's status to "Claimed" ---
export const updateItemStatus = mutation({
  args: {
    itemId: v.id("items"),
    status: v.string(), // "Claimed" or "Available"
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be logged in.");

    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found.");

    if (item.clerkUserId !== identity.subject) {
      throw new Error("You are not authorized to modify this item.");
    }

    await ctx.db.patch(args.itemId, { status: args.status });
  },
});

// --- NEW: Delete an item ---
export const deleteItem = mutation({
  args: {
    itemId: v.id("items"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be logged in.");

    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found.");

    if (item.clerkUserId !== identity.subject) {
      throw new Error("You are not authorized to delete this item.");
    }

    // Also delete messages associated with the item
    const messages = await ctx.db.query("messages").withIndex("by_itemId", q => q.eq("itemId", args.itemId)).collect();
    for (const message of messages) {
        await ctx.db.delete(message._id);
    }

    await ctx.db.delete(args.itemId);
  },
});