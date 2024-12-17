import { Global, Module, Provider } from '@nestjs/common';
import { UserController } from './http/user/user.controller';
import { UserService } from './services/user.service';
import { UserEmailExistsConstraint } from './constraints';
import { createMikroOrmRepositoryProviders } from '@mikro-orm/nestjs/mikro-orm.providers';
import { User } from './entites/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteUserCommand, DeleteUserHandler, SaveUserCommand, SaveUserHandler } from './commands';
import { GetUserHandlers, GetUserQuery, GetUsersListHandler, GetUsersListQuery } from './queries';
import { KeycloakUserService } from './services/keycloak-user.service';
import { KeycloakUserBuilderService } from './services/keycloak-user.builder.service';
import { UserKeysService } from './services/user-keys.service';

const sharedProviders: Provider[] = [UserService];

const providers: Provider[] = [
    ...createMikroOrmRepositoryProviders([User]),
    UserKeysService,
    KeycloakUserService,
    KeycloakUserBuilderService,
    UserEmailExistsConstraint,
    SaveUserCommand,
    SaveUserHandler,
    DeleteUserCommand,
    DeleteUserHandler,
    GetUsersListQuery,
    GetUsersListHandler,
    GetUserQuery,
    GetUserHandlers,
];

@Global()
@Module({
    controllers: [UserController],
    imports: [
        CqrsModule,
        MikroOrmModule.forFeature({
            entities: [User],
        }),
        // KeycloakModule
    ],
    providers: [...providers, ...sharedProviders],
    exports: [...sharedProviders],
})
export class UsersModule {}
