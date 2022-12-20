import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypeRole } from '../auth.constants';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { JwtOptionalGuard } from '../guards/jwt.optional.guard';

export function Auth(role: TypeRole = 'USER') {
  const guards = () => {
    if (role === 'ADMIN') return UseGuards(JwtAuthGuard, OnlyAdminGuard);
    else if (role === 'USER') return UseGuards(JwtAuthGuard);
    else return UseGuards(JwtOptionalGuard);
  };
  return applyDecorators(guards());
}
