import Keycloak, { type KeycloakConfig, type KeycloakLoginOptions } from 'keycloak-js';
import { routes } from '../router/index';

const options: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const keycloakInstance = new Keycloak(options);

interface CallbackOneParam<T1 = void, T2 = void> {
    (param1: T1): T2;
}

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = async (onAuthenticatedCallback: CallbackOneParam): Promise<void> => {
    const authenticated = await keycloakInstance.init({});

    if (authenticated) {
        onAuthenticatedCallback();

        return;
    }

    // The Vue Router isnt available yet because the app isn't initialized at this point
    const currentPath: string = window.location.pathname;
    const currentRouteObject = routes.find((route) => route.path === currentPath);

    if (currentRouteObject && currentRouteObject.meta?.requiresAuth) {
        keycloakInstance.login();
    } else {
        onAuthenticatedCallback();
    }
};

const UserName = (): string | undefined => keycloakInstance?.tokenParsed?.preferred_username;

const Token = (): string | undefined => keycloakInstance?.token;

const LogOut = () => keycloakInstance.logout();

const refreshToken = async (successCallback: Function): Promise<void> => {
    // If token is expiring in 5 seconds or less, refresh it
    return keycloakInstance
        .updateToken(5)
        .then(() => successCallback())
        .catch(doLogin);
};

const doLogin = async (options?: KeycloakLoginOptions) => await keycloakInstance.login(options);

const isLoggedIn = () => !!keycloakInstance.token;

const KeycloakService = {
    CallLogin: Login,
    GetUserName: UserName,
    GetAccesToken: Token,
    CallLogOut: LogOut,
    RefreshToken: refreshToken,
    IsLoggedIn: isLoggedIn,
    GoToLogin: doLogin
};

export default KeycloakService;
