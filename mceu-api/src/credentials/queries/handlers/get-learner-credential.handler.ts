import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CREDENTIAL_RESPONSE_FIELDS } from '../../types';
import { CredentialRepository } from '../../repositories/credential.repository';
import { CredentialDetailsDto } from '../../dtos';
import { GetLearnerCredentialQuery } from '../get-learner-credential.query';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/entites/user.entity';

@QueryHandler(GetLearnerCredentialQuery)
export class GetLearnerCredentialHandler implements IQueryHandler<GetLearnerCredentialQuery> {
    public constructor(
        private readonly userService: UserService,
        private readonly credentialRepository: CredentialRepository,
    ) {}

    public async execute(query: GetLearnerCredentialQuery): Promise<CredentialDetailsDto> {
        const { authUser, credentialId } = query;
        const learner: User | null = await this.userService.getLearnerUserByEmail(authUser.email);

        return await this.credentialRepository.findOneOrFail(
            {
                id: credentialId,
                owner: learner.id,
                status: { $ne: CredentialStatus.REVOKED },
            },
            {
                fields: CREDENTIAL_RESPONSE_FIELDS,
            },
        );
    }
}
