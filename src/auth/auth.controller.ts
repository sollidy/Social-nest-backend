import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUser } from '../decorators/jwtUser.decorator';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthDto, LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.id, user.roles);
  }

  @Get('me')
  @Auth()
  @ApiBearerAuth()
  async me(@JwtUser('id') id: string) {
    return this.authService.me(id);
  }
}
