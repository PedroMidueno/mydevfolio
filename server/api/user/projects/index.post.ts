import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  const userPage = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    }
  })

  return userPage
})
