import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async register(dto: AuthDto) {
    return this.userModel.create(dto);
  }
}
