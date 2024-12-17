import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserRealmRoles } from '../../../../shared/enums/auth/realm-roles.enum';
import { realmRoleBuilderHelper } from '../../../../shared/helpers';
import { CommandBus } from '@nestjs/cqrs';
import { UserRequestsCommand } from '../commands';
import { AuthenticatedUserInterface } from '../../../../shared/types';
import { IssuanceRequestDto } from '../dtos';
import { UserRequestsServiceType } from '../types';

@ApiTags('User Request')
@ApiBearerAuth()
@Controller('user-requests')
export class UserRequestsController {
    public constructor(private readonly commandBus: CommandBus) {}

    @Post('/issuance')
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.LEARNER)] })
    public async create(
        @Body() issuanceRequest: IssuanceRequestDto,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<void> {
        try {
            await this.commandBus.execute(
                new UserRequestsCommand(issuanceRequest, user, UserRequestsServiceType.ISSUANCE_REQUESTS),
            );
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
