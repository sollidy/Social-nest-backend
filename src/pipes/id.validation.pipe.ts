import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from '../auth/auth.constants';

export class IdValidationPipe implements PipeTransform {
  transform(val: string, meta: ArgumentMetadata) {
    if (meta.type !== 'param') return val;

    if (!Types.ObjectId.isValid(val))
      throw new BadRequestException(INVALID_ID_ERROR);

    return val;
  }
}
