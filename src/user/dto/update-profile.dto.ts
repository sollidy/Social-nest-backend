import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @MaxLength(300)
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  @IsOptional()
  aboutMe: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  homeUrl: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  lookingForAJob: boolean;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  @IsOptional()
  lookingForAJobDescription: string;
}

export class UpdatePartialProfileDto extends PartialType(UpdateProfileDto) {}
