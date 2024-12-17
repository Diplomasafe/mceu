export const VET_PROVIDER_CONFIG_KEY = 'vetProvider';

export interface VetProviderConfigInterface {
    name: string;
    email: string;
    did?: string;
    eSealCert?: string;
    keys: string;
}
