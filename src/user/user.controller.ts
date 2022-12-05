import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userServise.delete(id);
    if (!deletedUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
