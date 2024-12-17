import type { Route } from '@/models/routes';
import ThirdPartyView from '@/views/ThirdPartyView/ThirdPartyView.vue';

export const adminRoutes: Array<Route> = [
    {
        path: '/credentials/:id',
        name: 'credential-third-party-view',
        component: ThirdPartyView,
    },
];
