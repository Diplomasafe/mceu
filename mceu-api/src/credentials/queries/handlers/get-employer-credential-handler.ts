import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CREDENTIAL_PUBLIC_RESPONSE_FIELDS } from '../../types';
import { CredentialRepository } from '../../repositories/credential.repository';
import { GetEmployerCredentialQuery } from '../get-employer-credential.query';
import { CredentialDetailsDto } from '../../dtos';
import { CredentialStatus } from '../../enums/credential-status.enum';

@QueryHandler(GetEmployerCredentialQuery)
export class GetEmployerCredentialHandler implements IQueryHandler<GetEmployerCredentialQuery> {
    public constructor(private readonly credentialRepository: CredentialRepository) {}

    public async execute(query: GetEmployerCredentialQuery): Promise<CredentialDetailsDto> {
        return await this.credentialRepository.findOneOrFail(
            {
                id: query.credentialId,
                status: CredentialStatus.CLAIMED,
            },
            {
                fields: CREDENTIAL_PUBLIC_RESPONSE_FIELDS,
            },
        );
    }
}
