import { z } from 'zod'
import prisma from '~/lib/prisma'


const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userDescription: z.string().optional(),
  userJobPositionName: z.string().optional()
})

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }

  const body = await readValidatedBody(event, body => bodySchema.safeParse(body))
  if (!body.success) {
    throw createError('No se proporcionaron todos los datos')
  }

  await prisma.page.update({
    where: {
      userId
    },
    data: {
      userFirstName: body.data.firstName,
      userLastName: body.data.lastName,
      userDescription: body.data.userDescription,
      userJobPositionName: body.data.userJobPositionName
    }
  })

  return 'Success'
})
