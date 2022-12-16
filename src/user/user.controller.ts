import {
  Controller,
  Delete,
  Param,
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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Delete(':id')
  @Auth()
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedUser = await this.userServise.delete(id);
    await this.userServise.checkIsNotEmpty(deletedUser);
  }

  @Get('all')
  @Auth('ADMIN')
  async getAllUsers() {
    return this.userServise.getAll();
  }

  @Get(':id')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.userServise.getOne(id);
    return this.userServise.checkIsNotEmpty(profile);
  }

  @Patch('profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateProfile(
    @UserIdRoles() { id }: UserIdRolesDto,
    @Body() dto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.userServise.updateProfile(id, dto);
    return this.userServise.checkIsNotEmpty(updatedProfile);
  }

  @Post('follow/:followedId')
  @Auth()
  async follow(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userServise.follow(id, followedId);
    return this.userServise.checkIsNotEmpty(followedIds);
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
    return this.userServise.checkIsNotEmpty(followedIds);
  }
}
