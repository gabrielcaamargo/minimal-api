import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Module({
  controllers: [],
  providers: [UploadService],
})
export class UploadModule {}
