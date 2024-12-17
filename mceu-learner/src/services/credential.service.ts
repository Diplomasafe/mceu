import HttpService from './axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ClaimDetailsDto, CredentialClaimedDto, CredentialVcToken } from '@/dtos';
import type { PaginatedResponse } from '@/dtos/paginated-response.dto';
import type { Credential } from '@/dtos/credential.dto';

const axiosInstance: AxiosInstance = HttpService.getAxiosClient();

export const PATHS = {
    credentials: (): string => `/learner/credentials`,
    credentialsPaginated: (page: number, limit: number): string => `/learner/credentials?page=${page}&limit=${limit}`,
    credentialId: (id: string): string => `/public/credentials/${id}`,
    credentialEbsiJwt: (id: string): string => `/learner/credentials/${id}/ebsi-jwt`,
    credentialRequest: (): string => `/user-requests/issuance`,
    getClaimDetails: (id: string, hash: string): string => `/credentials/${id}/${hash}/claim-details`,
    claimCredential: (id: string): string => `/credentials/${id}/claim`,
};

class CredentialService {
    getCredentialsPaginated(page: number, limit: number): Promise<AxiosResponse<PaginatedResponse<Credential>>> {
        return HttpService.getAxiosClient().get(PATHS.credentialsPaginated(page, limit), {
            withCredentials: true,
        });
    }

    getCredentialById(id: string): Promise<AxiosResponse<Credential>> {
        return HttpService.getAxiosClient().get(PATHS.credentialId(id));
    }

    getJwt(id: string): Promise<AxiosResponse<CredentialVcToken>> {
        return axiosInstance.get<CredentialVcToken>(PATHS.credentialEbsiJwt(id), {
            withCredentials: true,
        });
    }

    requestCredential<T>(courseTitle: string): Promise<AxiosResponse<T>> {
        return axiosInstance.post<T>(
            PATHS.credentialRequest(),
            { courseTitle },
            {
                withCredentials: true,
            },
        );
    }

    getClaimDetails(id: string, hash: string): Promise<AxiosResponse<ClaimDetailsDto>> {
        return axiosInstance.get<ClaimDetailsDto>(PATHS.getClaimDetails(id, hash), {
            withCredentials: true,
        });
    }

    claimCredential(id: string, hash: string): Promise<AxiosResponse<CredentialClaimedDto>> {
        return axiosInstance.post<CredentialClaimedDto>(
            PATHS.claimCredential(id),
            { hash },
            {
                withCredentials: true,
            },
        );
    }
}

export default new CredentialService();
