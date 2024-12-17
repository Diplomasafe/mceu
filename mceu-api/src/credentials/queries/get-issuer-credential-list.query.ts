import { PaginationDto } from '../../shared/dtos/pagination/pagination.dto';

export class GetIssuerCredentialListQuery {
    constructor(public readonly paginationDto: PaginationDto) {}
}
