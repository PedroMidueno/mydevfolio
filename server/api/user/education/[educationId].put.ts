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

  const bodySchema = z.object({
    title: z.string().min(1),
    school: z.string().min(1),
    startDate: z.string().date(),
    endDate: z.string().date().optional(),
    isCurrentSchool: z.boolean()
  })

  const body = await readValidatedBody(event, body => bodySchema.safeParse(body))

  if (!body.success) {
    throw body.error.issues
  }

  const educationId = parseInt(event.context.params?.educationId as string, 10)

  const { startDate, endDate, ...rest } = body.data

  await prisma.userEducation.update({
    where: {
      id: educationId
    },
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined
    }
  })
})
