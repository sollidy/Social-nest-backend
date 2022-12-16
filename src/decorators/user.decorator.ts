import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { INVALID_ID_ERROR } from '../auth/auth.constants';
import { UserIdRolesDto } from '../auth/dto/userIdRoles.dto';

export const UserIdRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserIdRolesDto }>();

    if (!Types.ObjectId.isValid(request.user?.id))
      throw new BadRequestException(INVALID_ID_ERROR);

    return request.user;
  },
);
