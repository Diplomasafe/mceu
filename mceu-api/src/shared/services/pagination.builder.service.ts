import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { PaginatorDto } from '../dtos/pagination/paginator.dto';
import { PaginatedResponseDto } from '../dtos/pagination/paginated-response.dto';

@Injectable()
export class PaginationBuilderService {
    /**
     *  Build pagination
     *
     * @param paginationDto
     */
    public build(paginationDto: PaginationDto): PaginatorDto {
        const paginator = new PaginatorDto();
        paginator.page = Number(paginationDto.page || 1);
        paginator.limit = Number(paginationDto.limit || 10);

        paginator.offset = (paginator.page - 1) * paginator.limit;

        return paginator;
    }

    /**
     * Build pagination response
     *
     * @param data
     * @param total
     * @param paginator
     */
    public buildPaginatedResponse(data: any[], total: number, paginator: PaginatorDto): PaginatedResponseDto {
        const totalPages = Math.ceil(total / paginator.limit);

        return {
            ...paginator,
            total_pages: totalPages,
            total_records: total,
            data,
        };
    }
}
