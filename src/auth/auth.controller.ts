import {
  HttpException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserIdRoles } from '../decorators/user.decorator';
import { ID_NOT_FOUND_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthDto } from './dto/auth.dto';
import { UserIdRolesDto } from './dto/userIdRoles.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: Omit<AuthDto, 'name'>) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.id, user.roles);
  }

  @Get('me')
  @Auth()
  async me(@UserIdRoles() { id }: UserIdRolesDto) {
    const me = await this.authService.me(id);
    if (!me) {
      throw new HttpException(ID_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return me;
  }
}
