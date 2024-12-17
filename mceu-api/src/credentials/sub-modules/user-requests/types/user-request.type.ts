import { User } from "../../../../users/entites/user.entity";

export type UserRequest<T> = {
    type: string;
    user: User;
    data: T;
};
