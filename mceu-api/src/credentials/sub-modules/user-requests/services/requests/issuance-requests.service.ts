import { EventBus } from '@nestjs/cqrs';
import { IssuanceRequest, UserRequests, UserRequestsServiceType } from '../../types';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../../users/services/user.service';
import { AuthenticatedUserInterface } from '../../../../../shared/types';
import { User } from 'src/users/entites/user.entity';
import { UserRequestEvent } from '../../events';

@Injectable()
export class IssuanceRequestsService implements UserRequests {
    constructor(
        private readonly userService: UserService,
        private readonly eventBus: EventBus,
    ) {}

    type(type: UserRequestsServiceType): boolean {
        return type === UserRequestsServiceType.ISSUANCE_REQUESTS;
    }

    /**
     * @param {any} userRequest
     */
    async execute(userRequest: any, user: AuthenticatedUserInterface): Promise<void> {
        const userData: User | null = await this.userService.getUserByKeycloakId(user.sub);
        const data: IssuanceRequest = userRequest;

        this.eventBus.publish(
            new UserRequestEvent({ user: userData, data, type: UserRequestsServiceType.ISSUANCE_REQUESTS }),
        );
    }
}
