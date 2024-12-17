import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CREDENTIAL_JWT_RESPONSE_FIELDS } from '../../types';
import { CredentialRepository } from '../../repositories/credential.repository';
import { CredentialDetailsDto } from '../../dtos';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/entites/user.entity';
import { GetLearnerCredentialJwtQuery } from '../get-learner-credential-jwt.query';

@QueryHandler(GetLearnerCredentialJwtQuery)
export class GetLearnerCredentialJwtHandler implements IQueryHandler<GetLearnerCredentialJwtQuery> {
    public constructor(
        private readonly userService: UserService,
        private readonly credentialRepository: CredentialRepository,
    ) {}

    public async execute(query: GetLearnerCredentialJwtQuery): Promise<CredentialDetailsDto> {
        const { authUser, credentialId } = query;
        const learner: User | null = await this.userService.getLearnerUserByEmail(authUser.email);

        return await this.credentialRepository.findOneOrFail(
            {
                id: credentialId,
                owner: learner.id,
                status: { $ne: CredentialStatus.REVOKED },
            },
            {
                fields: CREDENTIAL_JWT_RESPONSE_FIELDS,
            },
        );
    }
}
