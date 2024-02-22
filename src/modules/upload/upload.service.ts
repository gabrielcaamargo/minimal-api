import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
  });

  async upload(fileName: string, file: Buffer, bucket?: string) {
    const bucketName = bucket ?? 'minimal-api-posts';

    const s3key = `${Date.now()} - ${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: s3key,
        Body: file,
      }),
    );

    return { key: s3key };
  }
}
