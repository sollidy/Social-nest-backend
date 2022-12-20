import { ApiProperty } from '@nestjs/swagger';
import { ResponseGetOne } from '../types/swagger-return-types';

export class ResponsePaginateUserDto {
  @ApiProperty()
  docs: ResponseGetOne[];
  @ApiProperty()
  totalDocs: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  hasPrevPage: boolean;
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  page?: number | undefined;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  prevPage?: number | null | undefined;
  @ApiProperty()
  nextPage?: number | null | undefined;
  @ApiProperty()
  pagingCounter: number;
}
