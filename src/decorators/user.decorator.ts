import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserIdRolesDto } from '../auth/dto/userIdRoles.dto';

export const UserIdRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserIdRolesDto }>();
    return request.user;
  },
);
