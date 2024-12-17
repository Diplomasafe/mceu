import { Migration } from '@mikro-orm/migrations';

export class Migration20240813080925 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "keycloak_id" varchar(255) null, "status" text check ("status" in (\'active\', \'inactive\')) not null default \'active\', "created_at" timestamptz not null, "updated_at" timestamptz null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
