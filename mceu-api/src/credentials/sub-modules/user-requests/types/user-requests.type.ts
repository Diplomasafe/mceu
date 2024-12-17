import { AuthenticatedUserInterface } from 'src/shared/types';
import { UserRequestsServiceType } from './user-requests-service.type';

export interface UserRequests {
    type(type: UserRequestsServiceType): boolean;
    execute(userRequest: any, user: AuthenticatedUserInterface): Promise<void>;
}
