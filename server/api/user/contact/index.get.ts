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
    }
  })

  const userContact = await prisma.userContact.findFirst({
    where: {
      pageId: userPage.id
    },
    include: {
      resumeFileResource: {
        select: {
          fileKey: true,
          originalName: true
        }
      }
    }
  })

  return {
    email: userContact?.email,
    githubUser: userContact?.githubUser,
    linkedinUser: userContact?.linkedinUser,
    twitterUser: userContact?.twitterUser,
    resumeFile: userContact?.resumeFileResource
  }
})
