import { Module, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), UploadModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
