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

  const userPage = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    },
    include: {
      userContact: {
        select: {
          id: true
        }
      }
    }
  })

  const bodySchema = z.object({
    githubUser: z.string().optional(),
    linkedinUser: z.string().optional(),
    twitterUser: z.string().optional()
  })

  const body = await readValidatedBody(event, body => bodySchema.safeParse(body))

  await prisma.userContact.update({
    where: {
      id: userPage.userContact?.id
    },
    data: {
      githubUser: body.data?.githubUser,
      linkedinUser: body.data?.linkedinUser,
      twitterUser: body.data?.twitterUser
    }
  })
})
