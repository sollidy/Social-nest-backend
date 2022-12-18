import { PickType } from '@nestjs/swagger';
import { Users } from '../user.model';

export class ResponseGetOne extends PickType(Users, [
  '_id',
  'profile',
  'name',
]) {}

export class ResponseGetAll extends PickType(Users, ['_id', 'email', 'name']) {}

export class ResponseProfile extends PickType(Users, ['_id', 'profile']) {}

export class ResponseFollow extends PickType(Users, ['_id', 'followedIds']) {}
