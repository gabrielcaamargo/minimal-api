import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { IParamsRequest } from 'src/shared/interfaces/ParamsRequest';
import { UploadService } from '../upload/upload.service';
import { User } from '../users/entities/user.entity';
import { createImageS3Url } from 'src/shared/utils/createImageS3Url';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    fileName: string,
    file: Buffer,
    loggedUserId: string,
  ) {
    const post = this.postsRepository.create(createPostDto);

    if (file) {
      const { key } = await this.uploadService.upload(fileName, file);

      post.coverUrl = createImageS3Url(process.env.AWS_POSTS_BUCKET, key);
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: loggedUserId,
      },
    });

    post.author = user;
    return this.postsRepository.save(post);
  }

  findAll({ order }: IParamsRequest) {
    const orderBy = order ?? 'ASC';

    return this.postsRepository.find({
      order: {
        createdAt: orderBy,
      },
      select: {
        comments: {
          id: true,
          author: {
            id: true,
            name: true,
          },
          comment: true,
        },
      },
      relations: ['likes', 'author', 'comments'],
    });
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      select: {
        comments: {
          id: true,
          author: {
            id: true,
            name: true,
          },
          comment: true,
        },
      },
      relations: ['likes', 'author', 'comments'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async delete(id: string, loggedUserId: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== loggedUserId) {
      throw new BadRequestException(
        'To delete a comment you must own this comment',
      );
    }

    return this.postsRepository.delete(id);
  }
}
