import { Module } from '@nestjs/common';
import { PostCommentReplyService } from './post-comment-reply.service';
import { PostCommentReplyController } from './post-comment-reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from 'src/modules/posts/entities/post-comment.entity';
import { PostCommentReply } from 'src/modules/posts/entities/post-comment-reply.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment, PostCommentReply, User])],
  controllers: [PostCommentReplyController],
  providers: [PostCommentReplyService],
})
export class PostCommentReplyModule {}
