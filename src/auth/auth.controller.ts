import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiTags,
  ApiUnauthorizedResponse,
  refs,
} from '@nestjs/swagger';
import { JwtUser } from '../decorators/jwtUser.decorator';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import {
  AlreadyExistUserErrorDto,
  UserNotFoundErrorDto,
  WrongPasswordErrorDto,
} from './dto/auth-errors.dto';
import { AuthDto, LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@ApiExtraModels(UserNotFoundErrorDto, WrongPasswordErrorDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @ApiBadRequestResponse({ type: AlreadyExistUserErrorDto })
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiUnauthorizedResponse({
    schema: {
      anyOf: refs(UserNotFoundErrorDto, WrongPasswordErrorDto),
    },
  })
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
