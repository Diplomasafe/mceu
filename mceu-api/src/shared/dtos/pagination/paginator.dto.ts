import { IsNotEmpty } from 'class-validator';

export class PaginatorDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  offset: number;
}
