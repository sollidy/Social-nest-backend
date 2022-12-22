import { ApiProperty } from '@nestjs/swagger';
import { INVALID_ID_ERROR } from '../../auth/auth.constants';

export class IdValidationErrorDto {
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty({ default: INVALID_ID_ERROR })
  message: string;
  @ApiProperty({ default: 'Bad Request' })
  error: string;
}
