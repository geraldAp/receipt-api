import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName = process.env.AWS_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const uploadParams = {
        Bucket: this.bucketName,
        Key: `receipts/${fileName}`,
        Body: fileBuffer,
        ContentType: 'application/pdf',
      };

      await this.s3.send(new PutObjectCommand(uploadParams));

      return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/receipts/${fileName}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}
