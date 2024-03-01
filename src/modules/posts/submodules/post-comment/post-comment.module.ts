import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from '../../entities/post-comment.entity';
import { Post } from '../../entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment, Post, User])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
