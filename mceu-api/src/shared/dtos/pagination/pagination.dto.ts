import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @ApiProperty()
  page?: number;

  @IsOptional()
  @ApiProperty()
  limit?: number;
}
