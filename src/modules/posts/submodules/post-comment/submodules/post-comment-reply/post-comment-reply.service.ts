import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentReply } from 'src/modules/posts/entities/post-comment-reply.entity';
import { PostComment } from 'src/modules/posts/entities/post-comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostCommentReplyService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepo: Repository<PostComment>,
    @InjectRepository(PostCommentReply)
    private readonly postCommentReplyRepo: Repository<PostCommentReply>,
  ) {}
}
