import HttpService from './axios';
import type { PaginatedResponse } from '@/types/paginatedResponse';
import type { Credential } from '@/types/credential';
import type { AxiosResponse } from 'axios';

export const PATHS = {
    credentials: (): string => `/credentials`,
    credentialsPaginated: (page: number, limit: number): string => `/credentials/?page=${page}&limit=${limit}`,
    credentialId: (id: string): string => `/credentials/${id}`,
    credentialRevoke: (id: string): string => `/credentials/${id}/revoke`,
};

class CredentialsService {
    issueCredential(bodyParams: Credential): Promise<Credential> {
        return HttpService.getAxiosClient().post(PATHS.credentials(), bodyParams);
    }

    getCredentialsPaginated(page: number, limit: number): Promise<AxiosResponse<PaginatedResponse<Credential>>> {
        return HttpService.getAxiosClient().get(PATHS.credentialsPaginated(page, limit));
    }

    getCredentialById(id: string): Promise<AxiosResponse<Credential>> {
        return HttpService.getAxiosClient().get(PATHS.credentialId(id));
    }

    revokeCredential(id: string): Promise<AxiosResponse<Credential>> {
        return HttpService.getAxiosClient().patch(PATHS.credentialRevoke(id));
    }
}

export default new CredentialsService();
