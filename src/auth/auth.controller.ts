import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ALREADY_EXIST_EMAIL_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_EXIST_EMAIL_ERROR);
    }
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: Omit<AuthDto, 'name'>) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.email);
  }

  // @Get('me')
  // async me() {
  //   this.authService.me(id);
  // }
}
