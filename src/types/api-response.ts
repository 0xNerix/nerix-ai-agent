export interface StandardError {
  error: {
    code: string           // Machine-readable error code
    message: string        // Human-readable message  
    details?: unknown      // Optional additional context
    timestamp: string      // ISO timestamp
    traceId: string       // Request tracing ID
  }
  success: false
}

export interface StandardSuccess<T = unknown> {
  data: T
  success: true
  meta?: {
    pagination?: {
      page: number
      limit: number
      total: number
    }
    timestamp: string
    traceId?: string
  }
}

export type ApiResponse<T = unknown> = StandardSuccess<T> | StandardError

// Pagination interface
export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}