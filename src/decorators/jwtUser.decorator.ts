import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtUserDto } from '../auth/dto/jwtUser.dto';

export const JwtUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtUserDto }>();

    if (!Types.ObjectId.isValid(request.user?.id)) return undefined;

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
