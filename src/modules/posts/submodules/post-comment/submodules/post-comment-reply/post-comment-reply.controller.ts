import { Controller } from '@nestjs/common';
import { PostCommentReplyService } from './post-comment-reply.service';

@Controller('post-comment-reply')
export class PostCommentReplyController {
  constructor(private readonly postCommentReplyService: PostCommentReplyService) {}
}
