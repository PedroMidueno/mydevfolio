import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  const certificationId = parseInt(event.context.params?.certificationId ?? '', 10)

  const { id: pageId } = await prisma.page.findUniqueOrThrow({
    where: { userId }
  })

  await prisma.userCertification.delete({
    where: {
      id: certificationId,
      pageId
    }
  })
})
