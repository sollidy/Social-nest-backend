import { Controller, Get, Put, Param } from '@nestjs/common';
import { ProfileModel } from './profile.model';

@Controller('profile')
export class ProfileController {
  @Get(':id')
  async get(@Param('id') id: string) {}

  @Put()
  async update(dto: ProfileModel) {}
}
