import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
