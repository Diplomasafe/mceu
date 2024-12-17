export const EBSI_CONFIG_KEY = 'ebsi';

export interface EbsiConfigInterface {
    host: string;
    network: string;
    didRegistry: string;
    trustedIssuersRegistry: string;
    trustedPolicyRegistry: string;
    schemasRegistry: string;
    conformanceTest: boolean;
}
