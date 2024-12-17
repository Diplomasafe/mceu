import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    data: any[];

    @ApiProperty()
    @IsNotEmpty()
    page: number;

    @ApiProperty()
    @IsNotEmpty()
    limit: number;

    @ApiProperty()
    @IsNotEmpty()
    offset: number;

    @ApiProperty()
    @IsNotEmpty()
    total_pages: number;

    @ApiProperty()
    @IsNotEmpty()
    total_records: number;
}
