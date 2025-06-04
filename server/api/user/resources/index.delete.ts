export default defineEventHandler(event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }
})
