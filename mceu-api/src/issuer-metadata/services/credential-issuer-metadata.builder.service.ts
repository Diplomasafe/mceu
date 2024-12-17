import {
    CredentialIssuerMetadataDto,
    DisplayDto,
    SupportedCredentialDto,
    SupportedCredentialTrustFrameworkDto,
} from '../dtos';
import {
    APP_CONFIG_KEY,
    AppConfigInterface,
    EBSI_CONFIG_KEY,
    EbsiConfigInterface,
    KEYCLOAK_CONFIG_KEY,
    KeycloakConfigInterface,
} from '../../shared/types';
import { Inject } from '@nestjs/common';

export class CredentialIssuerMetadataBuilderService {
    constructor(
        @Inject(KEYCLOAK_CONFIG_KEY) private readonly keycloakConfig: KeycloakConfigInterface,
        @Inject(APP_CONFIG_KEY) private readonly appConfig: AppConfigInterface,
        @Inject(EBSI_CONFIG_KEY) private readonly ebsiConfig: EbsiConfigInterface,
    ) {}

    public async buildMetadata(): Promise<CredentialIssuerMetadataDto> {
        const metadata = new CredentialIssuerMetadataDto();

        metadata.authorization_server = `${this.keycloakConfig.authUrl}/realms/${this.keycloakConfig.realm}`;
        metadata.credential_issuer = `${this.appConfig.appUrl}`;
        metadata.credential_endpoint = `${this.appConfig.appUrl}/credentials`;
        metadata.deferred_credential_endpoint = `${this.appConfig.appUrl}/credentials`; //TODO: MM - change it when implement deferred

        const trustFramework = new SupportedCredentialTrustFrameworkDto();
        trustFramework.name = 'ebsi';
        trustFramework.type = 'Accreditation';

        const displayAuthorization = new DisplayDto();
        displayAuthorization.name = 'Verifiable Authorisation to onboard';
        displayAuthorization.locale = 'en-GB';

        const supportedCredentialAuthorisation = this.buildSupportedCredential(
            'jwt_vc',
            ['VerifiableCredential', 'VerifiableAttestation', 'VerifiableAuthorisationToOnboard'],
            trustFramework,
            displayAuthorization,
        );

        const displayAccreditation = new DisplayDto();
        displayAccreditation.name = 'Verifiable Accreditation to attest';
        displayAccreditation.locale = 'en-GB';

        const supportedCredentialAccreditation = this.buildSupportedCredential(
            'jwt_vc',
            [
                'VerifiableCredential',
                'VerifiableAttestation',
                'VerifiableAccreditation',
                'VerifiableAccreditationToAttest',
            ],
            trustFramework,
            displayAccreditation,
        );

        metadata.credentials_supported = [supportedCredentialAuthorisation, supportedCredentialAccreditation];

        if (this.ebsiConfig.conformanceTest) {
            const conformanceTestCredentialRndpoint = this.conformanceTest();
            metadata.credentials_supported = [...metadata.credentials_supported, ...conformanceTestCredentialRndpoint];
        }

        return metadata;
    }

    /**
     *
     * @param {string} format
     * @param {string[]} types
     * @param {SupportedCredentialTrustFrameworkDto} trustedFramework
     * @param {DisplayDto} display
     * @returns
     */
    private buildSupportedCredential(
        format: string,
        types: string[],
        trustedFramework: SupportedCredentialTrustFrameworkDto = null,
        display: DisplayDto = null,
    ): SupportedCredentialDto {
        const supportedCredential = new SupportedCredentialDto();

        supportedCredential.format = format;
        supportedCredential.types = types;
        if (trustedFramework) {
            supportedCredential.trust_framework = trustedFramework;
        }
        if (display) {
            supportedCredential.display = display;
        }

        return supportedCredential;
    }

    /**
     * @returns {SupportedCredentialDto[]}
     */
    private conformanceTest(): SupportedCredentialDto[] {
        const result: SupportedCredentialDto[] = [];
        const credentialIssuance = {
            'in-time': ['VerifiableCredential', 'VerifiableAttestation', 'CTWalletSameAuthorisedInTime'],
            deferred: ['VerifiableCredential', 'VerifiableAttestation', 'CTWalletSameAuthorisedDeferred'],
            'pre-authorised-in-time': [
                'VerifiableCredential',
                'VerifiableAttestation',
                'CTWalletSamePreAuthorisedInTime',
            ],
            'pre-authorised-deferred': [
                'VerifiableCredential',
                'VerifiableAttestation',
                'CTWalletSamePreAuthorisedDeferred',
            ],
        };

        for (const [key, value] of Object.entries(credentialIssuance)) {
            result.push(this.buildSupportedCredential('jwt_vc', value));
        }

        return result;
    }
}
