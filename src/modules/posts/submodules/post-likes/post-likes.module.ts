import { Module } from '@nestjs/common';
import { PostsLikesService } from './post-likes.service';
import { PostsLikesController } from './post-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from '../../entities/post.entity';
import { PostLike } from '../../entities/posts-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, PostLike])],
  controllers: [PostsLikesController],
  providers: [PostsLikesService],
})
export class PostLikesModule {}
