import type { Route } from '@/models/routes';
import CredentialIssuance from '@/views/CredentialIssuance/CredentialIssuance.vue';

export const adminRoutes: Array<Route> = [
    {
        path: '/credential-issuance',
        name: 'credential-issuance',
        component: CredentialIssuance,
        meta: { requiresAuth: true },
    },
];
