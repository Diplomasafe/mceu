import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../entites/user.entity';

export class UserRepository extends EntityRepository<User> {
    /**
     * Get user  by email address
     *
     * @param email
     */
    public async getByEmail(email: string): Promise<User | null> {
        const user = await this.createQueryBuilder('u')
            .where({
                email,
            })
            .getSingleResult();

        if (!user) {
            return null;
        }

        return wrap(user).init();
    }
}
