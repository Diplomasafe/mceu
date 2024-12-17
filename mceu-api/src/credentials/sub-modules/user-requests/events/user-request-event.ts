import { UserRequest } from "../types";

export class UserRequestEvent<T> {
    public constructor(public readonly requestData: UserRequest<T>) {}
}
