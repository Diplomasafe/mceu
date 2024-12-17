import { Command, CommandRunner } from 'nest-commander';
import { randomBytes } from 'crypto';

@Command({ name: 'generate-app-key', description: 'Generate a random app key', options: { isDefault: false } })
export class AppKeyCommand extends CommandRunner {
    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        try {
            const appKey = randomBytes(32).toString('hex');

            console.log(`App Key: ${appKey}`);
        } catch (error) {
            console.error('Error generating app key:', error);
        }
    }
}
