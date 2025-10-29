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
    where: { userId }
  })

  const userTechSkills = await prisma.techSkillsOnPages.findMany({
    where: {
      pageId: userPage.id
    },
    select: {
      techSkill: {
        select: {
          key: true,
          logo: true,
          name: true
        }
      }
    }
  })

  return userTechSkills.map(({ techSkill }) => ({
    techKey: techSkill.key,
    name: techSkill.name,
    logo: techSkill.logo
  }))
})
