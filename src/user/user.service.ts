import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
