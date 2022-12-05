import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
