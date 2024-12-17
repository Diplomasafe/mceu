import { ICommand } from '@nestjs/cqrs';
import { AuthenticatedUserInterface } from '../../../../shared/types';
import { UserRequestsServiceType } from '../types';

export class UserRequestsCommand implements ICommand {
    public constructor(
        public readonly userRequest: any,
        public readonly user: AuthenticatedUserInterface,
        public readonly type: UserRequestsServiceType,
    ) {}
}
