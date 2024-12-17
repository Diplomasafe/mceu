import type { Route } from '@/models/routes';
import CredentialList from '@/views/CredentialList/CredentialList.vue';

export const adminRoutes: Array<Route> = [
    {
        path: '/credential-list',
        name: 'credential-list',
        component: CredentialList,
        meta: { requiresAuth: true },
    },
];
