import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  ALREADY_EXIST_EMAIL_ERROR,
  ROLE_USER,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_EXIST_EMAIL_ERROR);
    }
    const salt = await genSalt(5);
    return this.userService.create({
      name: dto.name,
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
      roles: [ROLE_USER],
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { id: user.id as string, roles: user.roles };
  }

  async login(id: string, roles: string[]) {
    const payload = { id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me(id: string) {
    if (!id) return;
    return this.userService.findById(id);
  }
}
