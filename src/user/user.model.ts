import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
class Profile {
  @Prop({ default: null })
  status: string;

  @Prop({ default: null })
  aboutMe: string;

  @Prop({ default: null })
  homeUrl: string;

  @Prop({ default: false })
  lookingForAJob: boolean;

  @Prop({ default: null })
  lookingForAJobDescription: string;

  @Prop({ default: null })
  photo: string;
}

@Schema({ timestamps: true })
export class Users {
  @ApiProperty()
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop([String])
  followedIds: string[];

  @Prop([String])
  roles: string[];

  @Prop({ type: Profile })
  profile: Profile;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users);
