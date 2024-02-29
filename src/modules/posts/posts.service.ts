/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { IParamsRequest } from 'src/shared/interfaces/ParamsRequest';
import { UploadService } from '../upload/upload.service';
import { Photo } from '../photos/entities/photo.entity';
import { User } from '../users/entities/user.entity';
import { createImageS3Url } from 'src/shared/utils/createImageS3Url';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    fileName: string,
    file: Buffer,
    userId: string,
  ) {
    const post = this.postsRepository.create(createPostDto);
    let s3Key: string;
    let photo: Photo;

    if (file) {
      const { key } = await this.uploadService.upload(fileName, file);

      s3Key = key;

      photo = this.photosRepository.create({
        post,
        s3Key,
      });

      post.photo = photo;
      post.coverUrl = createImageS3Url(process.env.AWS_POSTS_BUCKET, s3Key);
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    post.authorId = user;

    if (file) {
      await Promise.all([
        this.photosRepository.save(photo),
        this.postsRepository.save(post),
      ]);
    } else {
      await this.postsRepository.save(post);
    }

    return { message: 'Post created!' };
  }

  findAll({ order }: IParamsRequest) {
    const orderBy = order ?? 'ASC';

    return this.postsRepository.find({
      order: {
        createdAt: orderBy,
      },
      relations: ['likes', 'authorId', 'photo'],
    });
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['photo'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const retrievedPostPhoto = await this.uploadService.retrieve(
      post.photo.s3Key,
    );
    const { Body } = retrievedPostPhoto;
  }

  async delete(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postsRepository.softDelete(id);
  }
}
