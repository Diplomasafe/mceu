import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../services/user.service';
import { Injectable } from '@nestjs/common';
import { User } from '../entites/user.entity';
import { UserRepository } from '../repositories/user.repository';

@ValidatorConstraint({ name: 'UserEmailExists', async: true })
@Injectable()
export class UserEmailExistsConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userRepository: UserRepository) {}

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const currentUserId = args.object['id']; // Assuming the user's ID is passed in the object

        const user: User | undefined = await this.userRepository.getByEmail(email);

        // If no user is found, the email doesn't exist, so it's valid
        if (!user) return true;

        // If the found user's ID matches the current user's ID, it's also valid
        return user.id === currentUserId;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Email $value already exists!';
    }
}
