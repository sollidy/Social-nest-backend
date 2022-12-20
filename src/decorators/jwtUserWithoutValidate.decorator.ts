import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserDto } from '../auth/dto/jwtUser.dto';

export const jwtUserWithoutValidate = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtUserDto }>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
