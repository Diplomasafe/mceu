import { User } from '../entites/user.entity';

export interface UserSavedInterface {
    user: User;
    temporaryPassword?: string;
}
