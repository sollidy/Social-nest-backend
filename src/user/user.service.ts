import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { USER_NOT_FOUND } from './user.constants';
import { UserDocument, Users } from './user.model';
import { PickNested } from './utils/nested-pick-type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<Users> {
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: dto.passwordHash,
      roles: dto.roles,
      profile: { aboutMe: 'New here' },
    });
    return newUser.save();
  }

  async delete(id: string): Promise<Users | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByIdOrError(id: string): Promise<Users> {
    const user = await this.userModel.findById(id).exec();
    return this.checkIsNotEmpty(user);
  }

  async getAll(): Promise<Pick<Users, '_id' | 'email' | 'name'>[]> {
    return this.userModel.find({}, { name: 1, email: 1 }).exec();
  }

  async getOne(
    id: string,
  ): Promise<Pick<Users, '_id' | 'profile' | 'name'> | null> {
    return this.userModel.findById(id, 'profile name').exec();
  }

  async updateProfile(
    id: string,
    dto: UpdateProfileDto,
  ): Promise<Pick<Users, 'profile' | '_id'> | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          'profile.status': dto.status,
          'profile.aboutMe': dto.aboutMe,
          'profile.homeUrl': dto.homeUrl,
          'profile.lookingForAJob': dto.lookingForAJob,
          'profile.lookingForAJobDescription': dto.lookingForAJobDescription,
        },
        { new: true, select: 'profile', upsert: true },
      )
      .exec();
  }

  async follow(
    id: string,
    followedId: string,
  ): Promise<Pick<Users, '_id' | 'followedIds'> | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          $addToSet: { followedIds: followedId },
        },
        { new: true, select: 'followedIds' },
      )
      .exec();
  }

  async isFollowed(id: string, followedId: string): Promise<boolean> {
    const user = await this.findByIdOrError(id);
    return user.followedIds.includes(followedId);
  }

  async unfollow(
    id: string,
    unfollowId: string,
  ): Promise<Pick<Users, '_id' | 'followedIds'> | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { $pull: { followedIds: unfollowId } },
        { new: true, select: 'followedIds' },
      )
      .exec();
  }

  async savePhotoUrl(
    id: string,
    url: string,
  ): Promise<PickNested<Users, 'profile', 'photo'> | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { 'profile.photo': url },
        { new: true, select: 'profile.photo' },
      )
      .exec();
  }

  //internal
  async checkIsNotEmpty<T>(user: T | null) {
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
