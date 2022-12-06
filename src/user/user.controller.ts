import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userServise.delete(id);
    if (!deletedUser) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
