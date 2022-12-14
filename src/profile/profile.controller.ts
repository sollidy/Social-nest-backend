import {
  Controller,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ProfileDto } from './dto/profile.dto';
import { PROFILE_NOT_FOUND } from './profile.constants';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileServise: ProfileService) {}

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.profileServise.getById(id);
    if (!profile) {
      throw new HttpException(PROFILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  @Put()
  async update(dto: ProfileDto) {}
}
