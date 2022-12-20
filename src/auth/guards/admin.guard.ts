import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ONLY_ADMIN_ACCESS_ERROR, ROLE_ADMIN } from '../auth.constants';
import { JwtUserDto } from '../dto/jwtUser.dto';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ user: JwtUserDto }>();
    const { roles } = request.user;
    if (!roles.includes(ROLE_ADMIN))
      throw new ForbiddenException(ONLY_ADMIN_ACCESS_ERROR);
    return true;
  }
}
