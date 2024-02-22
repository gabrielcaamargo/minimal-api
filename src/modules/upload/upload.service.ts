import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
  });

  async upload(bucket: string, fileName: string, file: Buffer) {
    const bucketName = bucket ?? 'minimal-api-posts';

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: `${Date.now()} - ${fileName}`,
        Body: file,
      }),
    );

    return { message: 'Image succesfully uploaded' };
  }
}
