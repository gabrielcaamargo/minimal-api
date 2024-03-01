import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { PostLikeService } from './post-like.service';

@Controller('posts/like')
export class PostsLikesController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post()
  togglePostLike(@Body() createPostsLikeDto: CreatePostLikeDto) {
    return this.postLikeService.togglePostLike(createPostsLikeDto);
  }
}
