import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import KeyCloakService from './keycloak';

const _axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const setCookie = (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${KeyCloakService.GetAccesToken()}`;
    return config;
};

const configureAxiosKeycloak = async (): Promise<void> => {
    _axios.interceptors.request.use(async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        if (KeyCloakService.IsLoggedIn()) {
            await KeyCloakService.RefreshToken(() => setCookie(config));
        }

        return config;
    });
};

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
    configureAxiosKeycloak,
    getAxiosClient,
};

export default HttpService;
