import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: Omit<AuthDto, 'login'>) {}

  // @Get('me')
  // async me() {
  //   this.authService.me(id);
  // }
}
