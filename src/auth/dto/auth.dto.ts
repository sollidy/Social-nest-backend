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

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}
