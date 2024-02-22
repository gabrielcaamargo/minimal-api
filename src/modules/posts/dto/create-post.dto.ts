import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo } from 'src/modules/photos/entities/photo.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  photos: Photo[];

  @IsString()
  @IsNotEmpty({ message: 'An author is required' })
  authorId: User;
}
