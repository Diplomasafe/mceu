import { Migration } from '@mikro-orm/migrations';

export class Migration20240820132641 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "credentials" add column "claim_mail_sent_at" timestamptz null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "credentials" drop column "claim_mail_sent_at";');
  }

}
