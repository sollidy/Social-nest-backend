import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypeRole } from '../auth.constants';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Auth(role: TypeRole = 'USER') {
  return applyDecorators(
    role === 'ADMIN'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
}
