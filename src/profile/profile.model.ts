import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profiles>;
@Schema()
export class Profiles {
  @Prop({ default: null })
  aboutMe: string;

  @Prop({ default: null })
  status: string;

  @Prop({ default: false })
  lookingForAJob: boolean;

  @Prop({ default: null })
  lookingForAJobDescription: string;

  @Prop({ default: null })
  homeUrl: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profiles);
