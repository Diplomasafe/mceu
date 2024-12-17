import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClaimCredentialDetailsQuery } from '../get-claim-credential-details.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Credential } from '../../entities/credential.entity';
import { CredentialRepository } from '../../repositories/credential.repository';
import { UserService } from '../../../users/services/user.service';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { User } from '../../../users/entites/user.entity';
import { CredentialClaimDetailsDto } from '../../dtos';

@QueryHandler(GetClaimCredentialDetailsQuery)
export class GetClaimCredentialDetailsHandler implements IQueryHandler<GetClaimCredentialDetailsQuery> {
    constructor(
        @InjectRepository(Credential) private readonly credentialRepository: CredentialRepository,
        private readonly userService: UserService,
    ) {}

    public async execute(query: GetClaimCredentialDetailsQuery): Promise<CredentialClaimDetailsDto> {
        const { credentialId, credentialHash, authUser } = query;

        const credential = await this.credentialRepository.findOneOrFail({
            id: credentialId,
            hash: credentialHash,
            status: CredentialStatus.UNCLAIMED,
        });

        const learner: User | null = await this.userService.getLearnerUserByEmail(credential.learnerMail);

        return {
            title: credential.title,
            learnerExists: learner !== null,
            authenticatedLearner: authUser !== null,
            sameLearner: authUser !== null && learner?.email === authUser.email,
        };
    }
}
