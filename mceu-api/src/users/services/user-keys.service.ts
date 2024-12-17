import { Injectable, OnModuleInit } from '@nestjs/common';
import * as jose from 'node-jose';

@Injectable()
export class UserKeysService implements OnModuleInit {
    private didResolverModule: any;

    async onModuleInit(): Promise<void> {
        this.didResolverModule = await import('@cef-ebsi/key-did-resolver');
    }

    /**
     * Generate
     */
    public async generateKeys(): Promise<{ jwkKeys: any; did: string }> {
        const jwkKeys = await this.generateKeyPair();
        const did = this.didResolverModule.util.createDid(jwkKeys.publicKeyJwk);

        return { jwkKeys, did };
    }

    /**
     * Generate EC key pair
     * @private
     */
    private async generateKeyPair() {
        const keystore = jose.JWK.createKeyStore();

        // Generate EC Key Pair with the P-256 curve
        const key = await keystore.generate('EC', 'P-256');

        return {
            privateKeyJwk: key.toJSON(true),
            publicKeyJwk: key.toJSON(),
        };
    }
}
