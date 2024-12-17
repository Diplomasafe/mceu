import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { PaginationDto } from '../../shared/dtos/pagination/pagination.dto';
import { GetCredentialByIdDoc, GetCredentialListDoc, GetCredentialJwtByIdDoc } from '../decorators/documentaion';
import { GetLearnerCredentialJwtQuery, GetLearnerCredentialListQuery, GetLearnerCredentialQuery } from '../queries';
import { realmRoleBuilderHelper } from '../../shared/helpers';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { AuthenticatedUserInterface } from '../../shared/types';
import { CredentialResponse } from '../types';
import { PaginatedResponseDto } from '../../shared/dtos/pagination/paginated-response.dto';
import { CredentialJwtDto } from '../dtos';

@ApiTags('Learner credentials')
@ApiBearerAuth()
@Controller('learner/credentials')
export class LearnerCredentialsController {
    public constructor(private readonly queryBus: QueryBus) {}

    @Get()
    @GetCredentialListDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.LEARNER)] })
    public async getCredentialList(
        @Query() paginationDto: PaginationDto,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<PaginatedResponseDto> {
        try {
            return await this.queryBus.execute(new GetLearnerCredentialListQuery(paginationDto, user));
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

    @Get(':id')
    @GetCredentialByIdDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.LEARNER)] })
    public async getCredential(
        @Param('id') id: string,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<CredentialResponse> {
        try {
            return await this.queryBus.execute(new GetLearnerCredentialQuery(id, user));
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

    @Get(':id/ebsi-jwt')
    @GetCredentialJwtByIdDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.LEARNER)] })
    public async getCredentialJwt(
        @Param('id') id: string,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<CredentialJwtDto> {
        try {
            return await this.queryBus.execute(new GetLearnerCredentialJwtQuery(id, user));
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
