import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from '../user/user.model';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  ROLE_USER,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const salt = await genSalt(5);
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
      roles: [ROLE_USER],
    });
    return newUser.save();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
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
    return this.userModel.findById(id);
  }
}
