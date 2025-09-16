import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // This is your existing items table, retained as requested
  items: defineTable({
    type: v.union(v.literal('lost'), v.literal('found')),
    itemName: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    imageUrl: v.optional(v.string()), 
    clerkUserId: v.string(),
    userName: v.optional(v.string()), 
    userEmail: v.string(),
    status: v.string(),
  }).index("by_clerkUserId", ["clerkUserId"]),

  // --- THIS IS THE NEW MESSAGES TABLE ---
  messages: defineTable({
    text: v.string(),
    itemId: v.id("items"), // This links the message to a specific item
    fromUserId: v.string(), // The Clerk ID of the user who sent the message
    toUserId: v.string(),   // The Clerk ID of the item's owner (the recipient)
  })
  // This index helps fetch all messages for an item quickly
  .index("by_itemId", ["itemId"]), 
});