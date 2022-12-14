import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileService } from '../profile/profile.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
    private readonly profileService: ProfileService,
  ) {}

  async create(dto: CreateUserDto) {
    const profile = await this.profileService.create();
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: dto.passwordHash,
      roles: dto.roles,
      profile: profile,
    });
    return newUser.save();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async getAllUsers() {
    return this.userModel.find({}, { name: 1, email: 1 }).exec();
  }
}
