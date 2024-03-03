import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from '../../entities/post-comment.entity';
import { Post } from '../../entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { PostCommentReplyModule } from './submodules/post-comment-reply/post-comment-reply.module';
import { PostCommentReply } from '../../entities/post-comment-reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostComment, Post, User, PostCommentReply]),
    PostCommentReplyModule,
  ],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
