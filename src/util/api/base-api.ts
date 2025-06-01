// src/util/api/base-api.ts
import axios, { AxiosRequestConfig } from "axios";

// Common interface for error response
export interface ErrorModel {
  error?: string | null;
}

// Common interface for paging request
export interface PagingReqModel {
  offset?: number;
  limit?: number;
}

// Common interface for paging response
export interface PagingResModel {
  total_count: number;
}

// Response structure matching your backend format
export interface ApiResponse<T = unknown> {
  total_count: number;
  data: T | null;
  error: string | null;
}

// Final return value from this utility
export interface BaseResponse<T = unknown> {
  status: number;
  data: T | null;
  total_count: number;
  error: string | null;
}

interface APIProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: unknown;
  params?: unknown;
}

const createAPI = async <T = unknown>({
  body,
  method,
  params,
  url,
}: APIProps): Promise<BaseResponse<T>> => {
  const config: AxiosRequestConfig = {
    baseURL: "/api/",
    method,
    url,
    data: body,
    params,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  };

  try {
    const response = await axios.request<ApiResponse<T>>(config);
    const { total_count, data, error } = response.data;

    return {
      status: response.status,
      data,
      total_count,
      error,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as ApiResponse<T>;
      throw new Error(responseData?.error || "Server error");
    }

    if (error instanceof Error) {
      throw new Error(error.message || "Unknown client error");
    }

    throw new Error("Unknown error occurred");
  }
};

export default createAPI;
