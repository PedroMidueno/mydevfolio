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

  const projects = await prisma.project.findMany({
    where: {
      pageId: userPage.id
    },
    select: {
      id: true,
      title: true,
      description: true,
      deployUrl: true,
      repositoryUrl: true,
      techSkills: {
        select: {
          techSkill: {
            select: {
              key: true,
              name: true,
              logo: true
            }
          }
        }
      },
      imageResource: {
        select: {
          fileKey: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return projects.map(p => {
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      deployUrl: p.deployUrl,
      repositoryUrl: p.repositoryUrl,
      techStack: p.techSkills.map(({ techSkill }) => ({
        techKey: techSkill.key,
        name: techSkill.name,
        logo: techSkill.logo
      })),
      imageKey: p.imageResource?.fileKey
    }
  })
})
