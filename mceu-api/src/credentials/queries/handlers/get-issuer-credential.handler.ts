import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIssuerCredentialQuery } from '../get-issuer-credential.query';
import { CREDENTIAL_RESPONSE_FIELDS } from '../../types';
import { CredentialRepository } from '../../repositories/credential.repository';
import { CredentialDetailsDto } from '../../dtos';

@QueryHandler(GetIssuerCredentialQuery)
export class GetIssuerCredentialHandler implements IQueryHandler<GetIssuerCredentialQuery> {
    public constructor(private readonly credentialRepository: CredentialRepository) {}

    public async execute(query: GetIssuerCredentialQuery): Promise<CredentialDetailsDto> {
        return await this.credentialRepository.findOneOrFail(query.id, {
            fields: CREDENTIAL_RESPONSE_FIELDS,
        });
    }
}
