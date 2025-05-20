import { z } from 'zod'
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
    jobTitle: z.string().min(1),
    company: z.string().min(1),
    jobDescription: z.string().min(1),
    startDate: z.string().date(),
    endDate: z.string().date().optional(),
    isCurrentJob: z.boolean()
  })

  const body = await readValidatedBody(event, body => bodySchema.safeParse(body))

  if (!body.success) {
    throw body.error.issues
  }

  const userPage = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    }
  })

  const { startDate, endDate, ...rest } = body.data

  await prisma.userExperience.create({
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      pageId: userPage.id
    }
  })
})
