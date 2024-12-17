import type { Route } from '@/models/routes';
import UsersList from '@/views/UsersList/UsersList.vue';

export const adminRoutes: Array<Route> = [
    {
        path: '/users',
        name: 'users',
        component: UsersList,
        meta: { requiresAuth: true },
    },
];
