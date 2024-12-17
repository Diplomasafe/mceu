import { Injectable } from '@nestjs/common';
import { VerifiableCredentialBuilderInterface } from '../../types';
import { Credential } from '../../../../entities/credential.entity';
import { VerifiableCredentialType } from '../../../../../shared/types/credentials/verifiable-credential.type';
import { VerifiableCredentialBaseBuilderService } from './verifiable-credential-base-builder.service';
import { ConfigService } from '@nestjs/config';
import { EbsiService } from '../ebsi.service';

@Injectable()
export class VerifiableAttestationBuilderService
    extends VerifiableCredentialBaseBuilderService
    implements VerifiableCredentialBuilderInterface
{
    constructor(
        protected readonly configService: ConfigService,
        private readonly ebsiService: EbsiService,
    ) {
        super(configService);
    }
    builderType(type: VerifiableCredentialType): boolean {
        return type === VerifiableCredentialType.VERIFIABLE_ATTESTATION;
    }

    public async build<T>(credential: Credential): Promise<{ issuer: any; payload: T; options: any }> {
        const issuer = this.getIssuerData();

        const payload = await this.generatePayload<T>(issuer.did, credential);

        const options = this.getOptions();

        return { issuer, payload, options };
    }

    private async generatePayload<T>(issuerDid: string, credential: Credential): Promise<T> {
        const credentialOwner = await credential.getOwner();
        const learnerDid = credentialOwner.ebsiDid;

        const issueDate: string = credential.issueDate.toISOString();

        const { host, trustedIssuersRegistry } = this.getEbsiSettings();

        const reservedAttributeId = await this.ebsiService.getReservedIdFromDid();

        return {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            id: 'urn:uuid:' + credential.id,
            type: ['VerifiableCredential', 'VerifiableAttestation'],
            issuer: issuerDid,
            issuanceDate: issueDate,
            validFrom: issueDate,

            issued: issueDate,
            credentialSubject: {
                id: learnerDid,
                name: credentialOwner.name,
                title: credential.title,
                level: credential.level,
                credits: credential.credits,
                criteria: credential.criteria,
                assessment_type: credential.assessmentType,
                participation_form: credential.participationForm,
                verified_by: credential.verifiedBy,
            },
            credentialSchema: {
                id: `https://${host}/trusted-schemas-registry/v3/schemas/z3MgUFUkb722uq4x3dv5yAJmnNmzDFeK5UC8x83QoeLJM`,
                type: 'FullJsonSchemaValidator2021',
            },
            termsOfUse: {
                id: `https://${host}/trusted-issuers-registry/${trustedIssuersRegistry}/issuers/${issuerDid}/attributes/${reservedAttributeId}`,
                type: 'IssuanceCertificate',
            },
        } as T;
    }
}
