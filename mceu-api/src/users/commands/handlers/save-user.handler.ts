import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveUserCommand } from '../save-user.command';
import { UserDto } from '../../dtos/user.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserService } from '../../services/user.service';

@CommandHandler(SaveUserCommand)
export class SaveUserHandler implements ICommandHandler<SaveUserCommand> {
    public constructor(private readonly userService: UserService) {}

    public async execute(command: SaveUserCommand): Promise<UserDto> {
        const { userDto } = command;

        const saveResult = await this.userService.saveUser(userDto);

        return saveResult.temporaryPassword === null
            ? plainToInstance(UserDto, instanceToPlain(saveResult.user))
            : ({
                  ...instanceToPlain(saveResult.user),
                  ...{ ['temporaryPassword']: saveResult.temporaryPassword },
              } as UserDto);
    }
}
