import prisma from '~/lib/prisma'
import { S3Service } from '~/lib/s3'

const objectStorage = S3Service.getInstance()

const deleteExistingImageResource = async (projectId: number) => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        imageResource: true
      }
    })

    if (existingProject?.imageResourceId) {
      await objectStorage.deleteObject(existingProject.imageResource?.fileKey ?? '')

      await prisma.resource.delete({
        where: {
          id: existingProject.imageResourceId
        }
      })
    }
  } catch (error) {
    console.error('Ocurrió un error al intentar eliminar la imagen del proyecto con id:' + projectId)
  }
}

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Forbidden access to this resource'
    })
  }

  // Read body as Form Data
  const body = await readMultipartFormData(event)

  // Parse body
  const projectId = parseInt(event.context.params?.projectId as string, 10)
  const title = body?.find(part => part.name === 'title')?.data.toString('utf8') ?? ''
  const description = body?.find(part => part.name === 'description')?.data.toString('utf8') ?? ''
  const deployUrl = body?.find(part => part.name === 'deployUrl')?.data.toString('utf8') ?? ''
  const repositoryUrl = body?.find(part => part.name === 'repositoryUrl')?.data.toString('utf8') ?? ''

  const techStackPart = body?.filter(part => part.name === 'techStack')
  const techStack = techStackPart?.map(tech => tech.data.toString('utf8')) ?? []
  const filePart = body?.find(part => part.name === 'file')

  let newImageId: number = 0

  if (filePart) {
    event.waitUntil(deleteExistingImageResource(projectId))

    // Upload image to object storage
    const folder = 'resources'
    const fileBuffer = Buffer.from(filePart!.data.buffer)
    const fileName = filePart!.filename!
    const mimeType = filePart!.type!

    const uploadResult = await objectStorage.uploadObject(folder, fileName, fileBuffer, mimeType)

    // Create resource in DB
    const updatedImage = await prisma.resource.create({
      data: {
        pageId: 1,
        fileKey: uploadResult.fileKey,
        originalName: fileName
      }
    })

    newImageId = updatedImage.id
  }

  // Update user project
  await prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      title,
      description,
      deployUrl,
      repositoryUrl,
      imageResourceId: newImageId ? newImageId : undefined,
      techSkills: {
        deleteMany: {},
        create: techStack.map(tech => ({
          techSkillKey: tech
        }))
      }
    }
  })

  return { success: true }
})
