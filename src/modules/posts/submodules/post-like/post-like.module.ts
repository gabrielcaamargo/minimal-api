import { Module } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { PostsLikesController } from './post-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from '../../entities/post.entity';
import { PostLike } from '../../entities/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, PostLike])],
  controllers: [PostsLikesController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
