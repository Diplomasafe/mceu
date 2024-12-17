import type { Route } from '@/models/routes';
import Claim from '@/views/Claim/Claim.vue';

export const adminRoutes: Array<Route> = [
  {
    path: '/claim/:id/:hash',
    name: 'claim',
    component: Claim,
  }
];
