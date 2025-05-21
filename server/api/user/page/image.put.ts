import prisma from '~/lib/prisma'
import { S3Service } from '~/lib/s3'

export default defineEventHandler(async event => {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You do not have access to this resource'
    })
  }

  const objectStorage = S3Service.getInstance()
  const body = await readMultipartFormData(event)

  if (!body || body.length === 0) {
    throw createError({ statusCode: 400, message: 'No se recibieron archivos.' })
  }

  const fileData = body[0]
  const folder = 'resources'
  const fileBuffer = Buffer.from(fileData.data.buffer)
  const fileName = fileData.filename!
  const mimeType = fileData.type!

  const oldPageData = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      id: true,
      userImageResource: {
        select: {
          id: true,
          fileKey: true
        }
      }
    }
  })

  const { fileKey } = await objectStorage.uploadObject(folder, fileName, fileBuffer, mimeType)

  const newResource = await prisma.resource.create({
    data: {
      pageId: oldPageData.id,
      fileKey,
      originalName: fileName
    }
  })

  const updatedPageData = await prisma.page.update({
    where: {
      userId
    },
    data: {
      userImageResourceId: newResource.id
    }
  })

  if (oldPageData?.userImageResource) {
    await objectStorage.deleteObject(oldPageData.userImageResource.fileKey)

    await prisma.resource.delete({
      where: {
        id: oldPageData?.userImageResource.id
      }
    })
  }

  return updatedPageData
})
