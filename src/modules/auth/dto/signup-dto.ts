import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsOptional()
  description: string;
}
