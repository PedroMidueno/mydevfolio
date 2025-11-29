import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }

  const { isPublished } = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      isPublished: true
    }
  })

  return {
    isPublished
  }
})
