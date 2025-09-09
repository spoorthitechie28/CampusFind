import { action, mutation } from './_generated/server';
import { v } from 'convex/values';

// --- Generate secure upload URL ---
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// --- Create item action ---
export const createItem = action({
  args: {
    type: v.union(v.literal('lost'), v.literal('found')),
    itemName: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    storageId: v.optional(v.string()), // ✅ optional now
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

    // Send data to your Node.js backend
    const backendApiUrl = process.env.BACKEND_API_URL;
    const backendApiSecret = process.env.BACKEND_API_SECRET;

    if (!backendApiUrl || !backendApiSecret) {
      throw new Error('Backend API URL or Secret not configured.');
    }

    const result = await fetch(`${backendApiUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': backendApiSecret,
      },
      body: JSON.stringify({
        userId: identity.subject,
        userEmail: identity.email,
        userName: identity.name,
        type: args.type,
        itemName: args.itemName,
        category: args.category,
        description: args.description,
        location: args.location,
        imageUrl, // can be null if no file uploaded
      }),
    });

    if (!result.ok) {
      const errorBody = await result.text();
      throw new Error(`Failed to save item to backend: ${errorBody}`);
    }

    return await result.json();
  },
});
