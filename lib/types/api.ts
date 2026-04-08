export type PaginationMeta = {
  pagination: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export type ApiResponse<T, M = undefined> = {
  success: boolean;
  data: T;
  meta: M;
};

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

export type ApiError = {
  success: boolean;
  error: {
    code: ErrorCode;
    message: string;
  };
};