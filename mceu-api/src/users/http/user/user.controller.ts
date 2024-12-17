import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UnprocessableEntityException,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination/pagination.dto';
import { Roles } from 'nest-keycloak-connect';
import { UserRealmRoles } from '../../../shared/enums/auth/realm-roles.enum';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { InjectIdToRequestInterceptor } from '../../../shared/interceptors';
import { UserDto } from '../../dtos/user.dto';
import { realmRoleBuilderHelper } from '../../../shared/helpers';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteUserCommand, SaveUserCommand } from '../../commands';
import { User } from '../../entites/user.entity';
import { GetUserQuery, GetUsersListQuery } from '../../queries';

import {
    CreateUserDoc,
    DeleteUserDoc,
    GetUserByIdDoc,
    GetUsersListDoc,
    UpdateUserDoc,
} from '../../decorators/documentaion';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @GetUsersListDoc()
    @ApiOkResponse({
        isArray: true,
        type: PaginatedResponseDto,
        description: 'User list',
    })
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async index(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto> {
        return await this.queryBus.execute(new GetUsersListQuery(paginationDto));
    }

    @Get(':id')
    @GetUserByIdDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async single(@Param('id') id: string): Promise<User> {
        try {
            return await this.queryBus.execute(new GetUserQuery(id));
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

    @Post()
    @CreateUserDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async create(@Body() user: UserDto): Promise<UserDto> {
        try {
            return await this.commandBus.execute(new SaveUserCommand(user));
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }

    @Patch(':id')
    @UseInterceptors(InjectIdToRequestInterceptor)
    @UpdateUserDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async update(@Param('id') id: string, @Body() user: UserDto): Promise<UserDto> {
        try {
            return await this.commandBus.execute(new SaveUserCommand(user));
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }

    @Delete(':id')
    @DeleteUserDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async destroy(@Param('id') id: string): Promise<{ success: boolean }> {
        try {
            const deleteResult = await this.commandBus.execute(new DeleteUserCommand(id));

            return { success: deleteResult };
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
