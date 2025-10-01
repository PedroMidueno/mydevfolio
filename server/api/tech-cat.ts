import prisma from '~/lib/prisma'
import type { TechSkillKey } from '~/prisma/seeds/catalogs/tech-skills'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  return (await prisma.techSkillCat.findMany()).map(({ key, name, logo }) => ({
    techKey: key as TechSkillKey,
    name,
    logo
  }))
})
