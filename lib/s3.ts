import type { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class S3Service {
  private static instance: S3Service | null = null
  private s3Instance: S3Client | null = null

  private constructor() { }

  public static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
    }
    return S3Service.instance
  }

  private getS3(): S3Client {
    if (!this.s3Instance) {
      this.s3Instance = new S3Client({
        endpoint: process.env.R2_ENDPOINT,
        region: process.env.R2_REGION,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
        }
      })
    }
    return this.s3Instance
  }

  public getObject(key: string) {
    const s3 = this.getS3()
    const params = {
      Bucket: process.env.R2_BUCKET_NAME as string,
      Key: key
    }

    const command = new GetObjectCommand(params)

    return s3.send(command)
  }

  public async uploadObject(folder: string, fileName: string, fileData: Buffer, contentType: string) {
    const s3 = this.getS3()
    const bucket = process.env.R2_BUCKET_NAME!
    const fileKey = `${folder}/${randomUUID()}-${fileName}`

    const params = {
      Bucket: bucket,
      Key: fileKey,
      Body: fileData,
      ContentType: contentType
    }

    const command = new PutObjectCommand(params)

    await s3.send(command)

    return {
      fileKey
    }
  }

  public deleteObject(key: string) {
    const s3 = this.getS3()
    const params = {
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key
    }

    const command = new DeleteObjectCommand(params)

    return s3.send(command)
  }
}
