import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsLikesService } from './posts-likes.service';
import { CreatePostsLikeDto } from './dto/create-posts-like.dto';
import { UpdatePostsLikeDto } from './dto/update-posts-like.dto';

@Controller('posts-likes')
export class PostsLikesController {
  constructor(private readonly postsLikesService: PostsLikesService) {}

  @Post()
  create(@Body() createPostsLikeDto: CreatePostsLikeDto) {
    return this.postsLikesService.create(createPostsLikeDto);
  }

  @Get()
  findAll() {
    return this.postsLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostsLikeDto: UpdatePostsLikeDto) {
    return this.postsLikesService.update(+id, updatePostsLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsLikesService.remove(+id);
  }
}
