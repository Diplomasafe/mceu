import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { User } from '../../entites/user.entity';
import { UserRepository } from '../../repositories/user.repository';

@QueryHandler(GetUserQuery)
export class GetUserHandlers implements IQueryHandler<GetUserQuery> {
    public constructor(private readonly userRepository: UserRepository) {}

    public async execute(query: GetUserQuery): Promise<User> {
        const { userId } = query;

        return await this.userRepository.findOneOrFail(userId);
    }
}
