import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersListQuery } from '../get-users-list.query';
import { PaginationBuilderService } from '../../../shared/services/pagination.builder.service';
import { UserRepository } from '../../repositories/user.repository';
import { QueryOrder } from '@mikro-orm/core';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';

@QueryHandler(GetUsersListQuery)
export class GetUsersListHandler implements IQueryHandler<GetUsersListQuery> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly paginationBuilder: PaginationBuilderService,
    ) {}

    public async execute(query: GetUsersListQuery): Promise<PaginatedResponseDto> {
        const paginationData = this.paginationBuilder.build(query.paginationDto);

        const [users, total] = await this.userRepository.findAndCount(
            {},
            {
                orderBy: { createdAt: QueryOrder.DESC },
                offset: paginationData.offset,
                limit: paginationData.limit,
            },
        );

        return this.paginationBuilder.buildPaginatedResponse(users, total, paginationData);
    }
}
