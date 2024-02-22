import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo } from 'src/modules/photos/entities/photo.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  file?: Photo;

  @IsString()
  @IsOptional()
  authorId: User;
}
