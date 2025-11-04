import z from 'zod'
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

  const bodySchema = z.object({
    title: z.string().min(1),
    certificateIssuer: z.string().min(1),
    issuedDate: z.string().date(),
    certificateUrl: z.string().url()
  })

  const { success, data: body, error } = await readValidatedBody(event, body => bodySchema.safeParse(body))

  if (!success) {
    throw error.issues
  }

  const { issuedDate, ...rest } = body

  await prisma.userCertification.update({
    where: {
      id: certificationId,
      pageId
    },
    data: {
      issuedDate: new Date(issuedDate),
      ...rest
    }
  })
})
