import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcryptjs';
import { SignupDto } from './dto/signup-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async signin({ email, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const userExists = await this.usersRepository.findOne({
      where: {
        email: signupDto.email,
      },
    });

    if (userExists) {
      throw new BadRequestException('This email has already been taken');
    }

    const hashedPassword = await hash(signupDto.password, 12);

    return this.usersRepository.save({
      ...signupDto,
      password: hashedPassword,
    });
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync(
      { sub: userId },
      { secret: process.env.JWT_SECRET },
    );
  }
}
