import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { PostsLikesService } from './post-likes.service';

@Controller('posts/like')
export class PostsLikesController {
  constructor(private readonly postLikesService: PostsLikesService) {}

  @Post()
  togglePostLike(@Body() createPostsLikeDto: CreatePostLikeDto) {
    return this.postLikesService.togglePostLike(createPostsLikeDto);
  }
}
