import { EntityRepository } from '@mikro-orm/postgresql';
import { Credential } from '../entities/credential.entity';

export class CredentialRepository extends EntityRepository<Credential> {}
