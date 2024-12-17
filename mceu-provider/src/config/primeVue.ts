import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

export const customPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            200: '{blue.200}',
            100: '{blue.100}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}',
        },
    },
});
