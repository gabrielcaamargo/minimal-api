import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostCommentReplyService } from './post-comment-reply.service';
import { CreatePostCommentReplyDto } from '../../dto/create-post-comment-reply.dto';
import { UserLogged } from 'src/shared/decorators/current-user.decorator';

@Controller('posts/comments/reply')
export class PostCommentReplyController {
  constructor(
    private readonly postCommentReplyService: PostCommentReplyService,
  ) {}

  @Post()
  async create(
    @Body() createPostCommentReplyDto: CreatePostCommentReplyDto,
    @UserLogged() userLoggedId: string,
  ) {
    return this.postCommentReplyService.create(
      createPostCommentReplyDto,
      userLoggedId,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postCommentReplyService.delete(id);
  }
}
