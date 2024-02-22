import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'An author is required' })
  authorId: User;
}
