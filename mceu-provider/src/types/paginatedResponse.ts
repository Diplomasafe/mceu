export type PaginatedResponse<T> = {
    data: T[];
    page: number;
    limit: number;
    offset: number;
    total_pages: number;
    total_records: number;
};
