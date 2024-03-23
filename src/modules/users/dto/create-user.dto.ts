import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsOptional()
  password: string

  @IsString()
  @IsOptional()
  location: string

  @IsNumber()
  @IsOptional()
  age: number

  @IsString()
  @IsOptional()
  description: string
}
