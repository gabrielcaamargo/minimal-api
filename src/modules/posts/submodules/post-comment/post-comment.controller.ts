import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UserLogged } from 'src/shared/decorators/current-user.decorator';

@Controller('posts/comments')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  create(
    @Body() createPostCommentDto: CreatePostCommentDto,
    @UserLogged() userId: string,
  ) {
    return this.postCommentService.create(createPostCommentDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserLogged() userId: string) {
    return this.postCommentService.remove(id, userId);
  }
}
