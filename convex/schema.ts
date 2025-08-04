import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),
    plan: v.union(v.literal('free'), v.literal('pro')),
    projectsUsed: v.number(),
    monthlyExports: v.number(),
    lastActiveAt: v.number(),
    createdAt: v.number(),
  }).index('by_token', ['tokenIdentifier']),

  projects: defineTable({
    title: v.string(),
    userId: v.id('users'),
    canvasState: v.any(),
    width: v.number(),
    height: v.number(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    activeTransformations: v.optional(v.string()),
    backgroundRemoved: v.optional(v.boolean()),
    folderId: v.optional(v.id('folders')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_updated', ['userId', 'updatedAt'])
    .index('by_folder', ['folderId']),

  folders: defineTable({
    name: v.string(),
    userId: v.id('users'),
    createdAt: v.number(),
  }).index('by_user', ['userId']),
})
