import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from '../auth/auth.constants';
import { JwtUserDto } from '../auth/dto/jwtUser.dto';

export const JwtUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtUserDto }>();

    if (!Types.ObjectId.isValid(request.user?.id))
      throw new BadRequestException(INVALID_ID_ERROR);

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
