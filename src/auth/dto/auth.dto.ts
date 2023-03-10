import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class AuthDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(4)
  password: string;
}

export class LoginDto extends OmitType(AuthDto, ['name'] as const) {}

//TODO Is it necessary add @ApiProperty to this class?
export class LoginResponseDto {
  _id: string;
  access_token: string;
}

export class RegisterResponseDto {
  _id: string;
  name: string;
  access_token: string;
}
