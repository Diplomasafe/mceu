import HttpService from './axios';
import type { AxiosResponse } from 'axios';
import type { PaginatedResponse } from '@/types/paginatedResponse';
import type { User, UserResponse } from '@/types/users';

export const PATHS = {
    users: (): string => `/user`,
    usersPaginated: (page: number, limit: number): string => `/user/?page=${page}&limit=${limit}`,
    userId: (id: string): string => `/user/${id}`,
};

class UsersService {
    getUsersPaginated(page: number, limit: number): Promise<AxiosResponse<PaginatedResponse<UserResponse>>> {
        return HttpService.getAxiosClient().get(PATHS.usersPaginated(page, limit));
    }

    createUser(bodyParams: User): Promise<AxiosResponse<UserResponse>> {
        return HttpService.getAxiosClient().post(PATHS.users(), bodyParams);
    }

    getUserById(id: string): Promise<AxiosResponse<UserResponse>> {
        return HttpService.getAxiosClient().get(PATHS.userId(id));
    }

    updateUser(id: string, bodyParams: User): Promise<AxiosResponse<UserResponse>> {
        return HttpService.getAxiosClient().patch(PATHS.userId(id), bodyParams);
    }

    deleteUser(id: string): Promise<AxiosResponse<void>> {
        return HttpService.getAxiosClient().delete(PATHS.userId(id));
    }
}

export default new UsersService();
