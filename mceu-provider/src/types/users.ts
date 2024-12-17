export type User = {
    id?: string | null;
    name: string | null;
    email: string | null;
    role: UserRole | null;
    status: UserStatus | null;
};

export type UserResponse = {
    id: string | null;
    name: string | null;
    email: string | null;
    role: UserRole | null;
    status: UserStatus | null;
    temporaryPassword?: string | null;
    keycloakId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
};

export enum UserRole {
    Provider = 'provider',
    Learner = 'learner',
}

export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
}
