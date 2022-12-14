import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profiles } from '../profile/profile.model';

export type UserDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  photo: string;

  @Prop([String])
  followedIds: string[];

  @Prop([String])
  roles: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' })
  profile: Profiles;
}

export const UserSchema = SchemaFactory.createForClass(Users);
