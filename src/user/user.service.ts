import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartialProfileDto } from './dto/update-profile.dto';
import { USER_IN_DB_NOT_FOUND_ERROR } from './user.constants';
import { UserDocument, Users } from './user.model';
import {
  ResponseFollow,
  ResponseGetAll,
  ResponseGetOne,
  ResponseProfile,
} from './types/swagger-return-types';
import { QueryUsersDto } from './dto/query-users.dto';
import { ResponsePaginateUserDto } from './dto/paginate-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: PaginateModel<UserDocument>,
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

  async getAll(): Promise<ResponseGetAll[]> {
    return this.userModel.find({}, { name: 1, email: 1 }).exec();
  }

  async getOne(id: string): Promise<ResponseGetOne | null> {
    return this.userModel.findById(id, 'profile name').exec();
  }

  async updateProfile(
    id: string,
    dto: UpdatePartialProfileDto,
  ): Promise<ResponseProfile | null> {
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

  async follow(id: string, followedId: string): Promise<ResponseFollow | null> {
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

  async isFollowed(id: string, checkId: string): Promise<boolean> {
    const user = await this.findByIdOrError(id);
    return user.followedIds.includes(checkId);
  }

  async unfollow(
    id: string,
    unfollowId: string,
  ): Promise<ResponseFollow | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { $pull: { followedIds: unfollowId } },
        { new: true, select: 'followedIds' },
      )
      .exec();
  }

  async savePhotoUrl(id: string, url: string): Promise<ResponseProfile | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { 'profile.photo': url },
        { new: true, select: 'profile' },
      )
      .exec();
  }

  async getUsers(
    id: string | undefined,
    query: QueryUsersDto,
  ): Promise<ResponsePaginateUserDto> {
    const { limit, page, friend = 'false', term = '' } = query;
    const termRegexp = new RegExp(term, 'i');
    const getPaginateOptions = (): PaginateOptions => ({
      sort: '-createdAt',
      page: (page && +page) || 1,
      limit: (limit && +limit) || 10,
      select: 'name profile',
    });
    if (id && friend === 'true') {
      const currentUser = await this.findByIdOrError(id);
      return this.userModel.paginate(
        {
          $and: [
            { name: termRegexp },
            { _id: { $in: currentUser.followedIds } },
          ],
        },
        getPaginateOptions(),
      );
    } else {
      return this.userModel.paginate(
        { name: termRegexp },
        getPaginateOptions(),
      );
    }
  }

  //internal
  async checkIsNotEmpty<T>(user: T | null) {
    if (!user) {
      throw new HttpException(USER_IN_DB_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
