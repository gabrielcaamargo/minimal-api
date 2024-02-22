import { Injectable } from '@nestjs/common';
import { CreatePostsLikeDto } from './dto/create-posts-like.dto';
import { UpdatePostsLikeDto } from './dto/update-posts-like.dto';

@Injectable()
export class PostsLikesService {
  create(createPostsLikeDto: CreatePostsLikeDto) {
    return 'This action adds a new postsLike';
  }

  findAll() {
    return `This action returns all postsLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postsLike`;
  }

  update(id: number, updatePostsLikeDto: UpdatePostsLikeDto) {
    return `This action updates a #${id} postsLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} postsLike`;
  }
}
