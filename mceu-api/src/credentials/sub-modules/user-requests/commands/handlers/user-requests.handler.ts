import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRequestsCommand } from '../user-requests.command';
import { RequestsFactory } from '../../factories/requests.factory';

@CommandHandler(UserRequestsCommand)
export class UserRequestsHandler implements ICommandHandler<UserRequestsCommand> {
    constructor(private readonly requestsFactory: RequestsFactory) {}

    public async execute(command: UserRequestsCommand): Promise<void> {
        const { userRequest, user, type } = command;

        const userRequestService = this.requestsFactory.create(type);

        userRequestService.execute(userRequest, user);
    }
}
