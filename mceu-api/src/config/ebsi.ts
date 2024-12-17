import { EBSI_CONFIG_KEY, EbsiConfigInterface } from '../shared/types';

export default (): { ebsi: EbsiConfigInterface } => ({
    [EBSI_CONFIG_KEY]: {
        host: process.env.EBSI_HOST,
        network: process.env.EBSI_NETWORK,
        didRegistry: process.env.EBSI_DID_REGISTRY,
        trustedIssuersRegistry: process.env.EBSI_TRUSTED_ISSUERS_REGISTRY,
        trustedPolicyRegistry: process.env.EBSI_TRUSTED_POLICY_REGISTRY,
        schemasRegistry: process.env.EBSI_SCHEMAS_REGISTRY,
        conformanceTest: process.env.EBSI_CONFORMANCE_TEST === "true",
    },
});
