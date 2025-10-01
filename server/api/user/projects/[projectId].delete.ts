import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  const id = parseInt(event.context.params?.projectId as string, 10)


  await prisma.project.delete({
    where: {
      id
    }
  })
})
