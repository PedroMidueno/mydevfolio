import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }

  const userPage = await prisma.page.findUnique({
    where: {
      userId
    },
    include: {
      userImageResource: true
    }
  })

  return {
    userFirstName: userPage?.userFirstName,
    userLastName: userPage?.userLastName,
    userJobPositionName: userPage?.userJobPositionName,
    userDescription: userPage?.userDescription,
    userImageFileKey: userPage?.userImageResource?.fileKey
  }
})
