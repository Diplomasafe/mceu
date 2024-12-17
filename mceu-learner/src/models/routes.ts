import type { DefineComponent } from 'vue';

export interface Route {
    path: string;
    name: string;
    alias?: string;
    component: DefineComponent<{}, {}, any>;
    props?: any;
    meta?: any;
}
