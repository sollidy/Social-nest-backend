import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userServise.delete(id);
    if (!deletedUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('all')
  @Auth('ADMIN')
  async getAllUsers() {
    return this.userServise.getAllUsers();
  }
}
