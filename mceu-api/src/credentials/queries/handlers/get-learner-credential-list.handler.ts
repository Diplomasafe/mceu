import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationBuilderService } from '../../../shared/services/pagination.builder.service';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { QueryOrder } from '@mikro-orm/core';
import { CredentialRepository } from '../../repositories/credential.repository';
import { CREDENTIAL_RESPONSE_FIELDS } from '../../types';
import { GetLearnerCredentialListQuery } from '../get-learner-credential-list.query';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/entites/user.entity';

@QueryHandler(GetLearnerCredentialListQuery)
export class GetLearnerCredentialListHandler implements IQueryHandler<GetLearnerCredentialListQuery> {
    constructor(
        private readonly credentialRepository: CredentialRepository,
        private readonly paginationBuilder: PaginationBuilderService,
        private readonly userService: UserService,
    ) {}

    public async execute(query: GetLearnerCredentialListQuery): Promise<PaginatedResponseDto> {
        const { authUser } = query;
        const learner: User | null = await this.userService.getLearnerUserByEmail(authUser.email);
        const paginationData = this.paginationBuilder.build(query.paginationDto);

        const [credentials, total] = await this.credentialRepository.findAndCount(
            {
                owner: learner.id,
                status: CredentialStatus.CLAIMED,
            },
            {
                orderBy: { createdAt: QueryOrder.DESC },
                offset: paginationData.offset,
                limit: paginationData.limit,
                fields: CREDENTIAL_RESPONSE_FIELDS,
            },
        );

        return this.paginationBuilder.buildPaginatedResponse(credentials, total, paginationData);
    }
}
