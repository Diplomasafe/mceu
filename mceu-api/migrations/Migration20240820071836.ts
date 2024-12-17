import { Migration } from '@mikro-orm/migrations';

export class Migration20240820071836 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "credentials" ("id" varchar(255) not null, "learner_name" varchar(255) not null, "learner_mail" varchar(255) not null, "title" varchar(255) not null, "issuer_name" varchar(255) not null, "issuer_date" timestamptz not null, "criteria" varchar(255) not null, "credits" varchar(255) not null, "level" varchar(255) not null, "assessment_type" varchar(255) not null, "participation_form" varchar(255) not null, "verified_by" varchar(255) not null, "status" text check ("status" in (\'unclaimed\', \'claimed\', \'revoked\')) not null default \'unclaimed\', constraint "credentials_pkey" primary key ("id"));');
    this.addSql('create index "credentials_status_index" on "credentials" ("status");');

    this.addSql('create index "users_status_index" on "users" ("status");');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "credentials" cascade;');

    this.addSql('drop index "users_status_index";');
  }

}
