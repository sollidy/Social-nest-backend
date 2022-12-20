import { ApiProperty } from '@nestjs/swagger';

export class QueryUsersDto {
  @ApiProperty({ default: 10 })
  limit?: string;

  @ApiProperty({ default: 1 })
  page?: string;

  @ApiProperty()
  term?: string;

  @ApiProperty({ default: 'false', type: String })
  friend?: 'false' | 'true';
}
