import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
