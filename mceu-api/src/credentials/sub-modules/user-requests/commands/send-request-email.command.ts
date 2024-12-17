import { ICommand } from '@nestjs/cqrs';
import { UserRequest } from '../types';

export class SendRequestEmailCommand<T> implements ICommand {
    public constructor(public readonly requestData: UserRequest<T>) {}
}
