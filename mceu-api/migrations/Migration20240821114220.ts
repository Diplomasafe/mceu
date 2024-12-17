import { Migration } from '@mikro-orm/migrations';

export class Migration20240821114220 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "credentials" add column "hash" varchar(255) not null, add column "owner_id" varchar(255) null;');
    this.addSql('alter table "credentials" add constraint "credentials_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on delete no action;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "credentials" drop constraint "credentials_owner_id_foreign";');

    this.addSql('alter table "credentials" drop column "hash", drop column "owner_id";');
  }

}
