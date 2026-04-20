export type Pagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export type PaginationMeta = {
  pagination: Pagination;
};

export type ApiResponse<T, M = undefined> = {
  success: boolean;
  data: T;
  meta: M;
};

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

export type ApiError = {
  success: boolean;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
};

export function isApiError(e: unknown): e is ApiError {
  return (
    typeof e === 'object' &&
    e !== null &&
    'error' in e &&
    typeof (e as ApiError).error?.code === 'string'
  );
}