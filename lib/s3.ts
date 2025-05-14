import type { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import AWS from 'aws-sdk'

export class S3Service {
  private static instance: S3Service | null = null
  private s3Instance: AWS.S3 | null = null

  private constructor() { }

  public static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
    }
    return S3Service.instance
  }

  private getS3(): AWS.S3 {
    if (!this.s3Instance) {
      this.s3Instance = new AWS.S3({
        endpoint: process.env.R2_ENDPOINT,
        region: process.env.R2_REGION,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
        },
        signatureVersion: 'v4'
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

    return s3.getObject(params).promise()
  }

  public uploadObject(folder: string, fileName: string, fileData: Buffer, contentType: string) {
    const s3 = this.getS3()
    const bucket = process.env.R2_BUCKET_NAME!
    const uuidFileName = `${folder}/${randomUUID()}-${fileName}`

    const params = {
      Bucket: bucket,
      Key: uuidFileName,
      Body: fileData,
      ContentType: contentType
    }

    return s3.upload(params).promise()
  }

  public deleteObject(key: string) {
    const s3 = this.getS3()
    const params = {
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key
    }

    return s3.deleteObject(params).promise()
  }
}
