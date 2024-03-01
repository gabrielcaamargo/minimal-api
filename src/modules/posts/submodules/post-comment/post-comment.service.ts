import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from '../../entities/post-comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostCommentDto: CreatePostCommentDto, userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const post = await this.postRepository.findOne({
      where: {
        id: createPostCommentDto.post.id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const postComment = this.postCommentRepository.create(createPostCommentDto);

    postComment.author = user;
    postComment.post = post;

    return this.postCommentRepository.save(postComment);
  }

  async remove(id: string, userId: string) {
    const postComment = await this.postCommentRepository.findOne({
      where: {
        id,
      },
    });

    if (!postComment) {
      throw new NotFoundException('Comment not found');
    }

    if (postComment.author.id !== userId) {
      throw new BadRequestException(
        'To delete a comment you must own this comment',
      );
    }

    await this.postCommentRepository.delete(id);
  }
}
