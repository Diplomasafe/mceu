import {
    Cascade,
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    LoadStrategy,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { UserStatus } from '../enums/user-status.enum';
import { Timestamp } from '../../shared/entities';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repositories/user.repository';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { Credential } from '../../credentials/entities/credential.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity({
    tableName: 'users',
    repository: () => UserRepository,
})
export class User extends Timestamp {
    [EntityRepositoryType]: [UserRepository];

    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    name: string;

    @Property({ unique: true })
    email: string;

    @Property({ nullable: true })
    keycloakId?: string;

    @Enum({
        items: () => UserStatus,
        default: UserStatus.ACTIVE,
        nullable: false,
        index: true,
    })
    status: UserStatus = UserStatus.ACTIVE;

    @Enum({
        items: () => UserRealmRoles,
        nullable: false,
        index: true,
    })
    role: UserRealmRoles;

    @Exclude()
    @Transform(({ value }) => (value.isInitialized() ? value.getItems() : []))
    @OneToMany({
        entity: () => Credential,
        orphanRemoval: true,
        mappedBy: (credential: Credential) => credential.owner,
        cascade: [Cascade.PERSIST],
        strategy: LoadStrategy.JOINED,
    })
    credentials: Collection<Credential> = new Collection<Credential>(this);

    @Property({ nullable: true })
    ebsiDid?: string;

    @Property({ nullable: true, columnType: 'text' })
    ebsiDidKey?: string;

    public async getCredentials(): Promise<Credential[]> {
        if (!this.credentials.isInitialized()) {
            await this.credentials.init();
        }

        return this.credentials.getItems();
    }
}
