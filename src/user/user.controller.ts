import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserIdRolesDto } from '../auth/dto/userIdRoles.dto';
import { UserIdRoles } from '../decorators/user.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Delete(':id')
  @Auth()
  async delete(@Param('id', IdValidationPipe) id: string) {
    await this.userServise.delete(id);
  }

  @Get('all')
  @Auth('ADMIN')
  async getAllUsers() {
    return this.userServise.getAll();
  }

  @Get(':id')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.userServise.getOne(id);
    if (!profile) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  @Patch('profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateProfile(
    @UserIdRoles() { id }: UserIdRolesDto,
    @Body() dto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.userServise.updateProfile(id, dto);
    if (!updatedProfile) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return updatedProfile;
  }

  @Post('follow/:followedId')
  @Auth()
  async follow(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userServise.follow(id, followedId);
    if (!followedIds) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return followedIds;
  }

  @Get('follow/:followedId')
  @Auth()
  async isFollowed(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    return this.userServise.isFollowed(id, followedId);
  }

  @Delete('follow/:unfollowedId')
  @Auth()
  async unfollow(
    @Param('unfollowedId', IdValidationPipe) unfollowedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userServise.unfollow(id, unfollowedId);
    if (!followedIds) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return followedIds;
  }
}
