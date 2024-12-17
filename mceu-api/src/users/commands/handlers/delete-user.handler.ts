import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { EntityManager } from '@mikro-orm/core';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly em: EntityManager,
    ) {}

    public async execute(command: DeleteUserCommand): Promise<boolean> {
        const { userId } = command;

        const user = await this.userRepository.findOneOrFail(userId);
        await this.em.removeAndFlush(user);

        return true;
    }
}
