import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() authPayload: AuthPayloadDto) {
    return this.authService.signin(authPayload);
  }

  @Public()
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
