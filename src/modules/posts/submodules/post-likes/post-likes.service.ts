import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { PostLike } from '../../entities/posts-like.entity';

@Injectable()
export class PostsLikesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikesRepository: Repository<PostLike>,
  ) {}

  async togglePostLike(createPostLikeDto: CreatePostLikeDto) {
    const { post, user } = createPostLikeDto;

    const foundUser = await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['likes'],
    });

    const foundPost = await this.postsRepository.findOne({
      where: {
        id: post.id,
      },
      relations: ['likes'],
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }

    const userHasAlreadyLikedPost = foundPost.likes?.find(
      (like, index) => like.id == foundUser.likes[index].id,
    );

    if (userHasAlreadyLikedPost) {
      if (foundPost.likesCount > 0) {
        delete foundPost.likes;
        const updatedPost = this.postsRepository.create(foundPost);
        updatedPost.likesCount--;
        await this.postsRepository.save(updatedPost);
      }

      await this.postLikesRepository.delete(userHasAlreadyLikedPost.id);
      return { message: 'Post unliked!' };
    } else {
      delete foundPost.likes;
      const updatedPost = this.postsRepository.create(foundPost);
      updatedPost.likesCount++;

      await Promise.all([
        this.postsRepository.save(updatedPost),
        this.postLikesRepository.save({
          user: foundUser,
          post: foundPost,
        }),
      ]);

      return { message: 'Post liked!' };
    }
  }
}
