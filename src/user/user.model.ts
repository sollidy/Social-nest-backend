import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class Profile {
  @ApiProperty({ default: null, required: false })
  @Prop({ default: null })
  status: string;

  @ApiProperty({ default: null, required: false })
  @Prop({ default: null })
  aboutMe: string;

  @ApiProperty({ default: null, required: false })
  @Prop({ default: null })
  homeUrl: string;

  @ApiProperty({ default: false, required: false })
  @Prop({ default: false })
  lookingForAJob: boolean;

  @ApiProperty({ default: null, required: false })
  @Prop({ default: null })
  lookingForAJobDescription: string;

  @ApiProperty({ default: null, required: false })
  @Prop({ default: null })
  photo: string;
}

@Schema({ timestamps: true })
export class Users {
  @ApiProperty({ readOnly: true })
  _id: string;

  @ApiProperty({ uniqueItems: true, required: true })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  passwordHash: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop([String])
  followedIds: string[];

  @ApiProperty()
  @Prop([String])
  roles: string[];

  @ApiProperty()
  @Prop({ type: Profile })
  profile: Profile;
}

export type UserDocument = HydratedDocument<Users>;
export const UserSchema = SchemaFactory.createForClass(Users);
