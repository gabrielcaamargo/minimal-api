import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { UploadService } from '../upload/upload.service';
import { Photo } from '../photos/entities/photo.entity';
import { PostLikesModule } from './submodules/post-likes/post-likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Photo]), PostLikesModule],
  controllers: [PostsController],
  providers: [PostsService, UploadService],
})
export class PostsModule {}
