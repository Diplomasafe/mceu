import { UserDto } from '../dtos/user.dto';

export class SaveUserCommand {
    public constructor(public readonly userDto: UserDto) {}
}
