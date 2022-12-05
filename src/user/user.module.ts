import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}
