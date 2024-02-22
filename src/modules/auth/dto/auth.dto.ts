import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
}
