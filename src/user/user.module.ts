import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  providers: [UserService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
