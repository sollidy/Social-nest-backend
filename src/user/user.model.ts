import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<Users>;

class UserPhotos {
  @Prop({ default: null })
  small: string;

  @Prop({ default: null })
  large: string;
}

@Schema({ timestamps: true })
export class Users {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  status: string;

  @Prop([String])
  followedIds: Array<string>;

  @Prop({ default: false })
  followed: boolean;

  @Prop([UserPhotos])
  photos: UserPhotos;
  // @Prop()
  // roles: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(Users);
