import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from './user.model';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async getProfile(id: string) {
    return this.userModel.findById(id).exec();
  }
}
