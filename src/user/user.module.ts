import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserAdminController, UserController } from './user.controller';
import { Users, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController, UserAdminController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
    CloudinaryModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
