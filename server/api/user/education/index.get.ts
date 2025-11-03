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
    where: { userId }
  })

  return await prisma.userEducation.findMany({
    where: {
      pageId: userPage.id
    },
    orderBy: {
      startDate: 'asc'
    },
    select: {
      id: true,
      title: true,
      school: true,
      startDate: true,
      endDate: true,
      isCurrentSchool: true
    }
  })
})
