import { clerkClient } from '@clerk/nuxt/server'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  const authenticatedUser = await clerkClient(event).users.getUser(userId)

  return authenticatedUser
})
