import {
    Entity,
    EntityRepositoryType,
    Enum,
    LoadStrategy,
    ManyToOne,
    PrimaryKey,
    Property,
    Ref,
    Reference,
} from '@mikro-orm/core';

import { v4 as uuidv4 } from 'uuid';
import { CredentialStatus } from '../enums/credential-status.enum';
import { CredentialRepository } from '../repositories/credential.repository';
import { Timestamp } from '../../shared/entities';
import { User } from '../../users/entites/user.entity';

function ReferenceToEntity() {}

@Entity({
    tableName: 'credentials',
    repository: () => CredentialRepository,
})
export class Credential extends Timestamp {
    [EntityRepositoryType]: [CredentialRepository];

    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    public learnerName: string;

    @Property()
    public learnerMail: string;

    @Property()
    public title: string;

    @Property()
    public issuerName: string;

    @Property()
    public issueDate: Date;

    @Property()
    public country: string;

    @Property()
    public criteria: string;

    @Property()
    public credits: string;

    @Property()
    public level: string;

    @Property()
    public assessmentType: string;

    @Property()
    public participationForm: string;

    @Property()
    public verifiedBy: string;

    @Property({ nullable: true, columnType: 'text' })
    public vcToken?: string = null;

    @Enum({
        items: () => CredentialStatus,
        default: CredentialStatus.UNCLAIMED,
        nullable: false,
        index: true,
    })
    public status: CredentialStatus = CredentialStatus.UNCLAIMED;

    @Property({ nullable: true })
    public claimMailSentAt: Date = null;

    @Property()
    public hash: string;

    @ManyToOne({
        entity: () => User,
        strategy: LoadStrategy.JOINED,
        fieldName: 'owner_id',
        nullable: true,
        cascade: [],
        deleteRule: 'no action',
        ref: true,
    })
    public owner?: Ref<User> | null = null;

    public async getOwner(): Promise<User> {
        await this.owner.load();

        return this.owner.getEntity();
    }

    public setOwner(owner: User): void {
        this.owner = Reference.create(owner);
    }
}
