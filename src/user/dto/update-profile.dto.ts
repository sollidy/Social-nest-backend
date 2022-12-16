import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MaxLength(300)
  @IsOptional()
  aboutMe: string;

  @IsBoolean()
  @IsOptional()
  lookingForAJob: boolean;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  status: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  lookingForAJobDescription: string;

  @IsUrl()
  @IsOptional()
  homeUrl: string;
}
