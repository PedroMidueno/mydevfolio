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

  const { fileKey } = await objectStorage.uploadObject(folder, fileName, fileBuffer, mimeType)

  const userPage = await prisma.page.findUniqueOrThrow({
    where: {
      userId
    },
    include: {
      userContact: {
        select: {
          resumeFileResource: {
            select: {
              id: true,
              fileKey: true
            }
          }
        }
      }
    }
  })

  const newResource = await prisma.resource.create({
    data: {
      originalName: fileName,
      fileKey,
      pageId: userPage.id
    }
  })

  const updatedUserContact = await prisma.userContact.update({
    where: {
      pageId: userPage.id
    },
    data: {
      resumeFileResourceId: newResource.id
    }
  })

  if (userPage.userContact?.resumeFileResource?.fileKey) {
    await objectStorage.deleteObject(userPage.userContact.resumeFileResource.fileKey)
    await prisma.resource.delete({
      where: {
        id: userPage.userContact.resumeFileResource.id
      }
    })
  }

  return updatedUserContact
})
