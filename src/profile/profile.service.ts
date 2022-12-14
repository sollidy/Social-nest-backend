import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileDto } from './dto/profile.dto';
import { ProfileDocument, Profiles } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profiles.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create() {
    return this.profileModel.create({ aboutMe: null });
  }

  async getById(id: string) {
    if (!id) return;
    return this.profileModel.findById(id);
  }

  async update(dto: ProfileDto) {
    return this.profileModel.findByIdAndUpdate();
  }
}
