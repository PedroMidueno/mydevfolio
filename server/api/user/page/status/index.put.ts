import z from 'zod'
import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }

  const bodySchema = z.object({
    status: z.boolean()
  })

  const { success, error, data: body } = await readValidatedBody(event, body => bodySchema.safeParse(body))

  if (!success || !body) {
    throw error.issues
  }

  await prisma.page.update({
    where: {
      userId
    },
    data: {
      isPublished: body.status
    }
  })
})
