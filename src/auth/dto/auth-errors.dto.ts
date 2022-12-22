import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  ALREADY_EXIST_EMAIL_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from '../auth.constants';

export class AlreadyExistUserErrorDto {
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty({ default: ALREADY_EXIST_EMAIL_ERROR })
  message: string;
  @ApiProperty({ default: 'Bad Request' })
  error: string;
}

export class UserNotFoundErrorDto {
  @ApiProperty({ default: 401 })
  statusCode: number;
  @ApiProperty({ default: USER_NOT_FOUND_ERROR })
  message: string;
  @ApiProperty({ default: 'Unauthorized' })
  error: string;
}

@ApiExtraModels()
export class WrongPasswordErrorDto {
  @ApiProperty({ default: 401 })
  statusCode: number;
  @ApiProperty({ default: WRONG_PASSWORD_ERROR })
  message: string;
  @ApiProperty({ default: 'Unauthorized' })
  error: string;
}
