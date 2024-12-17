import { PaginationDto } from '../../shared/dtos/pagination/pagination.dto';

export class GetUsersListQuery {
    constructor(public readonly paginationDto: PaginationDto) {}
}
