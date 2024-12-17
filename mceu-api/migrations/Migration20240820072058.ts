import { Migration } from '@mikro-orm/migrations';

export class Migration20240820072058 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            'alter table "credentials" add column "created_at" timestamptz not null, add column "updated_at" timestamptz null;',
        );
    }

    override async down(): Promise<void> {
        this.addSql('alter table "credentials" drop column "created_at", drop column "updated_at";');
    }
}
