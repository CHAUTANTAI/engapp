// src/util/api/base-api.ts
import axios, { AxiosRequestConfig } from "axios";

interface BaseResponse<T> {
  status: number;
  data: T | null;
}

interface APIProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
}
// axios config
const createAPI = async <T>({
  body,
  method,
  params,
  url,
}: APIProps): Promise<BaseResponse<T>> => {
  const config: AxiosRequestConfig = {
    baseURL: "/api/",
    method,
    url,
    data: body, // POST, PUT
    params, // GET, DELETE
    headers: {
      "Content-Type": "application/json", // JSON type for send and get
    },
    timeout: 10000, // set timeout
  };

  try {
    const response = await axios(config);
    return response as BaseResponse<T>;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // server error (status code 4xx, 5xx)
      throw new Error(
        error.response.data?.message || "An error occurred on the server"
      );
    } else if ((error as Error).message) {
      // (network error or timeout)
      console.error("API request error: No response received");
      throw new Error("Network error or request timeout");
    } else {
      // config request error
      console.error(
        "API request configuration error:",
        (error as Error).message
      );
      throw new Error((error as Error).message || "Error configuring request");
    }
  }
};

export default createAPI;
