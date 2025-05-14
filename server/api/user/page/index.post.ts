import { z } from 'zod'
import prisma from '~/lib/prisma'


const bodySchema = z.object({
  slug: z.string(),
  firstName: z.string(),
  lastName: z.string()
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

  await prisma.page.create({
    data: {
      slug: body.data.slug,
      userId,
      userFirstName: body.data.firstName,
      userLastName: body.data.lastName
    }
  })

  return 'Success'
})
