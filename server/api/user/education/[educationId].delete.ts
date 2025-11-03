import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  const educationId = parseInt(event.context.params!.educationId, 10)

  await prisma.userEducation.delete({
    where: {
      id: educationId
    }
  })
})
