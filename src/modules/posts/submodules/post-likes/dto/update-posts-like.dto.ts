import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsLikeDto } from './create-posts-like.dto';

export class UpdatePostsLikeDto extends PartialType(CreatePostsLikeDto) {}
