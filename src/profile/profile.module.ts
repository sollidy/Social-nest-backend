import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { Profiles, ProfileSchema } from './profile.model';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Profiles.name,
        schema: ProfileSchema,
      },
    ]),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
