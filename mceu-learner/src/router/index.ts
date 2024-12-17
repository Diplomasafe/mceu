import { createRouter, createWebHistory } from 'vue-router';
import KeyCloakService from '@/services/keycloak';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
/**
 * We export the raw route objets so we can check if the route requires authentication
 * during Keycloaks initialization which happens before the Vue app is initialized
 */
export const routes = Object.values(modules)
    .map((module: any) => (Object as any).values(module))
    .flat(2);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth) && !KeyCloakService.IsLoggedIn()) {
        try {
            await KeyCloakService.GoToLogin();
        } catch (error) {
            console.error('Login failed', error);
        }
    }
    
    next();
});

export default router;
