import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  async upload(fileName: string, file: Buffer, bucket?: string) {
    const bucketName = bucket ?? 'minimal-api-posts';

    const s3key = `${Date.now()}-${fileName}`;
    const fileToUpload = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3key,
      Body: file,
      ContentType: 'image/jpeg',
    });

    await this.s3Client.send(fileToUpload);

    return { key: s3key };
  }
}
