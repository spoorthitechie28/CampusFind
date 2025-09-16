import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    type: v.union(v.literal('lost'), v.literal('found')),
    itemName: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    
    // --- FIX #1 ---
    // Allows the imageUrl to be a string OR undefined/null
    imageUrl: v.optional(v.string()), 
    
    clerkUserId: v.string(),
    
    // --- FIX #2 ---
    // Allows the userName to be a string OR undefined/null
    userName: v.optional(v.string()), 
    
    userEmail: v.string(),
    status: v.string(),
  }).index("by_clerkUserId", ["clerkUserId"]),
});