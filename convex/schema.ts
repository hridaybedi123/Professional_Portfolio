import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  }).index("by_status", ["status"]),
  
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    category: v.string(),
    imageUrl: v.string(),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    featured: v.boolean(),
  }).index("by_category", ["category"])
    .index("by_featured", ["featured"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
