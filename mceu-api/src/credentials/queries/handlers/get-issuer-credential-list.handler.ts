import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIssuerCredentialListQuery } from '../get-issuer-credential-list.query';
import { PaginationBuilderService } from '../../../shared/services/pagination.builder.service';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { QueryOrder } from '@mikro-orm/core';
import { CredentialRepository } from '../../repositories/credential.repository';
import { CREDENTIAL_RESPONSE_FIELDS } from '../../types';

@QueryHandler(GetIssuerCredentialListQuery)
export class GetIssuerCredentialListHandler implements IQueryHandler<GetIssuerCredentialListQuery> {
    constructor(
        private readonly credentialRepository: CredentialRepository,
        private readonly paginationBuilder: PaginationBuilderService,
    ) {}

    public async execute(query: GetIssuerCredentialListQuery): Promise<PaginatedResponseDto> {
        const paginationData = this.paginationBuilder.build(query.paginationDto);

        const [credentials, total] = await this.credentialRepository.findAndCount(
            {},
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
