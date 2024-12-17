import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    EBSI_CONFIG_KEY,
    EbsiConfigInterface,
    VET_PROVIDER_CONFIG_KEY,
    VetProviderConfigInterface,
} from '../../../../../shared/types';

import * as fs from 'fs';

@Injectable()
export class VerifiableCredentialBaseBuilderService implements OnModuleInit {
    private keysData: any;
    private didJwtModule: any;

    constructor(protected readonly configService: ConfigService) {
        this.getVetProviderSettings();
    }

    async onModuleInit(): Promise<void> {
        this.didJwtModule = await import('did-jwt');
    }

    private getVetProviderSettings(): void {
        const { keys } = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);
        const pkFileContent = fs.readFileSync(process.cwd() + keys, 'utf8');
        this.keysData = JSON.parse(pkFileContent);
    }

    protected getIssuerData() {
        // Convert JWK 'd' field to Uint8Array
        const privateKey = this.didJwtModule.base64ToBytes(this.keysData.keys.ES256.privateKeyJwk.d);

        return {
            did: this.keysData.did,
            kid: this.keysData.keys.ES256.kid,
            alg: 'ES256',
            signer: this.didJwtModule.ES256Signer(privateKey),
        };
    }

    protected getOptions() {
        const { host, network, didRegistry, trustedIssuersRegistry, trustedPolicyRegistry, schemasRegistry } =
            this.getEbsiSettings();
        return {
            // REQUIRED. EBSI Network ("production", "preprod", "conformance", "pilot", or "test")
            network: network,

            // REQUIRED. List of trusted hosts running the EBSI Core Services APIs.
            hosts: [host],

            // OPTIONAL. List of trusted services with their respective version number (e.g. "v5").
            // Only declare this if you need to override the default versions.
            services: {
                'did-registry': didRegistry,
                'trusted-issuers-registry': trustedIssuersRegistry,
                'trusted-policies-registry': trustedPolicyRegistry,
                'trusted-schemas-registry': schemasRegistry,
            },

            // OPTIONAL. Timeout after which the requests made by the library will fail. Default: 15 seconds
            // timeout: 15_000,

            // OPTIONAL. Determines whether to validate the Verifiable Credential payload or not.
            // Validation is active by default.
            // Note: even when skipValidation is set to true, the payload must be a valid EBSI Verifiable Attestation.
            // skipValidation: false,

            // OPTIONAL. Determines whether to validate the accreditations of the VC issuer or not.
            // Validation is active by default.
            // skipAccreditationsValidation: false,

            // OPTIONAL. Determines whether to validate the credentials status or not.
            // Validation is active by default.
            // skipStatusValidation: false,

            // OPTIONAL. Determines whether to validate the credentials subject or not
            // Validation is active by default.
            // skipCredentialSubjectValidation: false,

            // OPTIONAL. Unix timestamp. Optional comparison date. Default: current date and time.
            // validAt: Date.now(),

            // OPTIONAL. Credential subject. This parameter is mandatory if the payload's `credentialSubject` is an array.
            // It must correspond to one of the IDs in the payload's `credentialSubject` array.
            // sub: "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbsNgeztBFXEB9FUZCoufTjXiTUZYKkcP36i2XAQCphfxBwvXG4dAaF6pdwhrMGyaLMC81fU5ECMnt4VgMQpwh3sn5vSbUpwoaTBME78noXJaTLgkCv5KkM6VgGTfWUjH8Z2",

            // OPTIONAL. Enable Ajv verbose mode (default: false)
            // verbose: false,

            // OPTIONAL. Extra credentialSchema types. By default, the library only supports "FullJsonSchemaValidator2021" and "JsonSchema".
            // The library is not responsible for validating these extra types.
            // extraCredentialSchemaTypes: [],
        };
    }

    /**
     * get Ebsis configuration
     * @protected
     */
    protected getEbsiSettings(): EbsiConfigInterface {
        return this.configService.get<EbsiConfigInterface>(EBSI_CONFIG_KEY);
    }
}
