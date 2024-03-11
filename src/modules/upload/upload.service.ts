import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PutObjectCommand, S3, DeleteObjectCommand } from '@aws-sdk/client-s3';

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

  async upload(bucketFolder: string, file: Express.Multer.File) {
    const s3key = `${bucketFolder}/${Date.now()}-${file.originalname}`;
    const fileToUpload = new PutObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: s3key,
      Body: file.buffer,
      ContentType: 'image/jpeg',
    });

    await this.s3Client.send(fileToUpload);

    return { key: s3key };
  }

  async remove(key: string) {
    const fileToDelete = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: key,
    });

    return this.s3Client.send(fileToDelete);
  }
}
