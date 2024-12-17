import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entites/user.entity';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { UserService } from '../../users/services/user.service';

@ValidatorConstraint({ name: 'IsLearnerEmail', async: true })
@Injectable()
export class IsLearnerEmailConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const user: User | null = await this.userService.getUserByEmail(email);

        // If no user is found, the email doesn't exist, so it's valid
        if (!user) {
            return true;
        }

        // Is valid if the user role isn't the provider
        return user.role !== UserRealmRoles.PROVIDER;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Cannot issue credential to user with role provider';
    }
}
