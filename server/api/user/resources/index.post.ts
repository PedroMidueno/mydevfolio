import { S3Service } from '~/lib/s3'
import prisma from '~/lib/prisma'

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

  const uploadResult = await objectStorage.uploadObject(folder, fileName, fileBuffer, mimeType)

  await prisma.resource.create({
    data: {
      pageId: 1,
      fileKey: uploadResult.fileKey,
      originalName: fileName
    }
  })

  return {
    fileKey: uploadResult.fileKey
  }
})
