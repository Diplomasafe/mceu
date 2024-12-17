import { Migration } from '@mikro-orm/migrations';

export class Migration20240828121007 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "credentials" add column "vc_token" text null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "credentials" drop column "vc_token";');
  }

}
