import './assets/css/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { customPreset } from './config/primeVue';

import KeyCloakService from './services/keycloak';
import HttpService from './services/axios';

const renderApp = () => {
    const app = createApp(App);

    app.use(createPinia())
        .use(router)
        .use(PrimeVue, {
            theme: {
                preset: customPreset,
                options: {
                    darkModeSelector: '.dark-mode',
                    cssLayer: true,
                },
            },
        })
        .use(ToastService);

    app.mount('#app');
};

KeyCloakService.CallLogin(renderApp);
HttpService.configureAxiosKeycloak();
