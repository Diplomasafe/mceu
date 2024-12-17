import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import {
    EBSI_CONFIG_KEY,
    EbsiConfigInterface,
    VET_PROVIDER_CONFIG_KEY,
    VetProviderConfigInterface,
} from '../../../../shared/types';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class EbsiService {
    private keysData: any;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    public async getReservedIdFromDid(): Promise<string> {
        const providerSettings = this.getVetProviderSettings();
        const { host, trustedIssuersRegistry } = this.getEbsiSettings();

        const response = await firstValueFrom(
            this.httpService.get(
                `https://${host}/trusted-issuers-registry/${trustedIssuersRegistry}/issuers/${providerSettings.did}`,
                {
                    headers: await this.generateHeaders(),
                },
            ),
        );

        const tiAttribute = response.data.attributes.find(
            (attribute: any) => attribute.issuerType == 'TI' && attribute.body !== '',
        );

        const decodedDidBody: any = jwtDecode(tiAttribute.body);

        return trustedIssuersRegistry === 'v4' ?
                decodedDidBody.vc.reservedAttributeId
            :   decodedDidBody.vc.credentialSubject.reservedAttributeId;
    }

    /**
     * Get vet provider key
     *
     * @private
     */
    private getVetProviderSettings(): any {
        const { keys } = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);
        const pkFileContent = fs.readFileSync(process.cwd() + keys, 'utf8');

        return JSON.parse(pkFileContent);
    }

    /**
     * Get ebsi settings
     *
     * @private
     */
    private getEbsiSettings() {
        return this.configService.get<EbsiConfigInterface>(EBSI_CONFIG_KEY);
    }

    /**
     * Generate headers
     *
     * @private
     */
    private async generateHeaders() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }
}
