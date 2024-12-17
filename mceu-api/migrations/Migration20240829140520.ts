import { Migration } from '@mikro-orm/migrations';

export class Migration20240829140520 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "users" add column "ebsi_did" varchar(255) null, add column "ebsi_did_key" text null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "users" drop column "ebsi_did", drop column "ebsi_did_key";');
  }

}
