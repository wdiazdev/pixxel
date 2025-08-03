import { use } from "react"
import { mutation, query } from "./_generated/server"

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    console.log("Identity:", identity)
    if (!identity) {
      throw new Error("Called storeUser without authentication present")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique()

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name })
      }
      return user._id
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      imageUrl: identity.pictureUrl,
      tokenIdentifier: identity.tokenIdentifier,
      plan: "free",
      projectsUsed: 0,
      monthlyExports: 0,
      lastActiveAt: Date.now(),
      createdAt: Date.now(),
    })
  },
})

export const exportCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique()

    if (!user) throw new Error("Forbidden")

    return user
  },
})
