import { VET_PROVIDER_CONFIG_KEY, VetProviderConfigInterface } from '../shared/types';

export default (): { vetProvider: VetProviderConfigInterface } => ({
    [VET_PROVIDER_CONFIG_KEY]: {
        name: process.env.VET_PROVIDER_NAME,
        email: process.env.VET_PROVIDER_EMAIL,
        did: process.env.VET_PROVIDER_DID,
        eSealCert: process.env.VET_PROVIDER_E_SEAL_CERT,
        keys: process.env.VET_PROVIDER_EBSI_KEYS,
    },
});
