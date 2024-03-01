import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { UploadService } from '../upload/upload.service';
import { PostLikeModule } from './submodules/post-like/post-like.module';
import { PostCommentModule } from './submodules/post-comment/post-comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    PostLikeModule,
    PostCommentModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, UploadService],
})
export class PostsModule {}
