import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  @Post('register')
  async register(@Body() dto: UserDto) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {}
}
