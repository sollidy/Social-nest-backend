import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { PROFILE_NOT_FOUND, USER_NOT_FOUND } from './user.constants';
import { UserProfileService } from './user.profile.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userServise: UserService,
    private readonly profileServise: UserProfileService,
  ) {}

  @Delete(':id')
  @Auth()
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedUser = await this.userServise.delete(id);
    if (!deletedUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('all')
  @Auth('ADMIN')
  async getAllUsers() {
    return this.userServise.getAll();
  }

  @Get(':id')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.userServise.getUser(id);
    if (!profile) {
      throw new HttpException(PROFILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return profile;
  }
}
