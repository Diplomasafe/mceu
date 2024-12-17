import { AuthenticatedUserInterface } from '../../shared/types';
import { PaginationDto } from '../../shared/dtos/pagination/pagination.dto';

export class GetLearnerCredentialListQuery {
    constructor(
        public readonly paginationDto: PaginationDto,
        public readonly authUser: AuthenticatedUserInterface,
    ) {}
}
