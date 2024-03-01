import { IsNotEmpty } from 'class-validator';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostLikeDto {
  @IsNotEmpty({ message: 'A post is mandatory' })
  post: Post;

  @IsNotEmpty({ message: 'An user is mandatory' })
  user: User;
}
