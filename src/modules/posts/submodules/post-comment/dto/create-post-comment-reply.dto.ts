import { IsNotEmpty, IsString } from 'class-validator';
import { PostComment } from 'src/modules/posts/entities/post-comment.entity';

export class CreatePostCommentReplyDto {
  @IsNotEmpty({ message: 'A comment is required' })
  @IsString()
  comment: string;

  @IsNotEmpty({ message: 'The replied comment is required' })
  repliedComment: PostComment;
}
