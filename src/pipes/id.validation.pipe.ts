import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from '../auth/auth.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(val: string, meta: ArgumentMetadata) {
    if (meta.type !== 'param' && meta.type !== 'custom') return val;

    if (!Types.ObjectId.isValid(val))
      throw new BadRequestException(INVALID_ID_ERROR);

    return val;
  }
}
