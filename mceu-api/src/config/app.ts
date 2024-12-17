import { APP_CONFIG_KEY, AppConfigInterface } from '../shared/types';

export default (): { app: AppConfigInterface } => ({
    [APP_CONFIG_KEY]: {
        appKey: process.env.APP_KEY,
        environment: process.env.ENVIRONMENT,
        appUrl: process.env.APP_URL,
        learnerAppUrl: process.env.LEARNER_APP_URL,
        providerAppUrl: process.env.PROVIDER_APP_URL,
    },
});
