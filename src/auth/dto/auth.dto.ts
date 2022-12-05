import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';
export class AuthDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}
