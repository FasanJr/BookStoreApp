export interface Pagination {
    currentPages: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result!: T;
    pagination!: Pagination;
}