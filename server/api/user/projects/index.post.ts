import prisma from '~/lib/prisma'
import { S3Service } from '~/lib/s3'

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

  const objectStorage = S3Service.getInstance()

  // Read body as Form Data
  const body = await readMultipartFormData(event)

  // Parse body
  const title = body?.find(part => part.name === 'title')?.data.toString('utf8') ?? ''
  const description = body?.find(part => part.name === 'description')?.data.toString('utf8') ?? ''
  const deployUrl = body?.find(part => part.name === 'deployUrl')?.data.toString('utf8') ?? ''
  const repositoryUrl = body?.find(part => part.name === 'repositoryUrl')?.data.toString('utf8') ?? ''

  const techStackPart = body?.filter(part => part.name === 'techStack')
  const techStack = techStackPart?.map(tech => tech.data.toString('utf8'))
  const filePart = body?.find(part => part.name === 'file')

  // Upload image to object storage
  const folder = 'resources'
  const fileBuffer = Buffer.from(filePart!.data.buffer)
  const fileName = filePart!.filename!
  const mimeType = filePart!.type!

  const uploadResult = await objectStorage.uploadObject(folder, fileName, fileBuffer, mimeType)

  // Create resource in DB
  const uploadedImage = await prisma.resource.create({
    data: {
      pageId: 1,
      fileKey: uploadResult.fileKey,
      originalName: fileName
    }
  })

  // Create user project
  await prisma.project.create({
    data: {
      title,
      description,
      deployUrl,
      repositoryUrl,
      pageId: userPage.id,
      imageResourceId: uploadedImage.id,
      techSkills: {
        create: techStack?.map(tech => ({
          techSkillKey: tech
        }))
      }
    }
  })

  return userPage
})
