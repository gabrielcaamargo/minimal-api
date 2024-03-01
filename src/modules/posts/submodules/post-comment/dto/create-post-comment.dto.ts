import { IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/modules/posts/entities/post.entity';

export class CreatePostCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment message is required' })
  comment: string;

  @IsNotEmpty({ message: 'Post is required' })
  post: Post;
}
