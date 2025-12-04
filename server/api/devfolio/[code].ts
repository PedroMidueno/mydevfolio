import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const devfolioCode = event.context.params?.code ?? ''

  if (!devfolioCode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Code was not provided'
    })
  }

  const { bucketPrefixUrl } = useRuntimeConfig(event).public

  const pageData = await prisma.page.findUnique({
    where: {
      slug: devfolioCode,
      isPublished: true
    },
    select: {
      userFirstName: true,
      userLastName: true,
      userDescription: true,
      userJobPositionName: true,
      userImageResource: {
        select: {
          fileKey: true
        }
      },

      // User contact
      userContact: {
        select: {
          email: true,
          githubUser: true,
          linkedinUser: true,
          twitterUser: true,
          resumeFileResource: {
            select: {
              fileKey: true
            }
          }
        }
      },

      // User experiences
      userExperiences: {
        select: {
          jobTitle: true,
          jobDescription: true,
          company: true,
          startDate: true,
          endDate: true,
          isCurrentJob: true
        },
        orderBy: {
          startDate: 'desc'
        }
      },

      // User projects
      projects: {
        select: {
          title: true,
          description: true,
          techSkills: {
            select: {
              techSkill: {
                select: {
                  logo: true,
                  name: true
                }
              }
            }
          },
          deployUrl: true,
          repositoryUrl: true,
          imageResource: {
            select: {
              fileKey: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },

      // User tech stack
      skills: {
        select: {
          techSkill: {
            select: {
              logo: true,
              name: true
            }
          }
        }
      },

      // User education
      userEducation: {
        select: {
          title: true,
          school: true,
          startDate: true,
          endDate: true,
          isCurrentSchool: true
        },
        orderBy: {
          startDate: 'desc'
        }
      },

      userCertifications: {
        select: {
          title: true,
          certificateIssuer: true,
          certificateUrl: true,
          issuedDate: true
        },
        orderBy: {
          issuedDate: 'desc'
        }
      }
    }
  })

  if (!pageData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Devfolio not found',
      fatal: true
    })
  }

  const {
    userFirstName,
    userLastName,
    userJobPositionName,
    userDescription,
    userImageResource,
    userContact,
    userExperiences: jobExperiences,
    projects,
    skills,
    userEducation: educations,
    userCertifications: certifications
  } = pageData

  return {
    heroInfo: {
      image: userImageResource ? `${bucketPrefixUrl}/${userImageResource.fileKey}` : null,
      name: `${userFirstName} ${userLastName}`,
      jobName: userJobPositionName,
      description: userDescription,
      email: userContact?.email ?? null,
      cvFile: userContact?.resumeFileResource ? `${bucketPrefixUrl}/${userContact.resumeFileResource.fileKey}` : null,
      githubUser: userContact?.githubUser ?? null,
      linkedinUser: userContact?.linkedinUser ?? null,
      twitterUser: userContact?.twitterUser ?? null
    },
    jobExperiences,
    projects: projects.map(p => ({
      title: p.title,
      description: p.description,
      techStack: p.techSkills.map(({ techSkill }) => ({ logo: techSkill.logo, name: techSkill.name })),
      repositoryUrl: p.repositoryUrl,
      deployUrl: p.deployUrl,
      image: p.imageResource ? `${bucketPrefixUrl}/${p.imageResource.fileKey}` : ''
    })),
    techSkills: skills.map(({ techSkill }) => ({ logo: techSkill.logo, name: techSkill.name })),
    educations,
    certifications
  }
})
