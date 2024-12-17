import { Migration } from '@mikro-orm/migrations';

export class Migration20240821081318 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "users" add column "role" text check ("role" in (\'provider\', \'learner\')) not null;');
    this.addSql('create index "users_role_index" on "users" ("role");');
  }

  override async down(): Promise<void> {
    this.addSql('drop index "users_role_index";');
    this.addSql('alter table "users" drop column "role";');
  }

}
