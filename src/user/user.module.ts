import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from '../profile/profile.module';
import { UserController } from './user.controller';
import { Users, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
    ProfileModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
