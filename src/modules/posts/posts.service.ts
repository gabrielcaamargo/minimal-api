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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createPostDto: CreatePostDto, fileName: string, file: Buffer) {
    const post = this.postsRepository.create(createPostDto);
    const { key } = await this.uploadService.upload(fileName, file);

    const photo = this.photoRepository.create({
      post,
      s3Key: key,
    });

    post.photo = photo;

    await this.photoRepository.save(photo);
    return this.postsRepository.save(post);
  }

  findAll({ order }: IParamsRequest) {
    const orderBy = order ?? 'ASC';

    return this.postsRepository.find({
      order: {
        createdAt: orderBy,
      },
    });
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postsRepository.update(id, updatePostDto);
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
