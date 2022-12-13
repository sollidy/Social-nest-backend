import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ONLY_ADMIN_ACCESS_ERROR } from '../auth.constants';
import { UserIdRolesDto } from '../dto/userIdRoles.dto';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user: UserIdRolesDto }>();
    const { roles } = request.user;
    if (!roles.includes('ADMIN'))
      throw new ForbiddenException(ONLY_ADMIN_ACCESS_ERROR);
    return true;
  }
}
