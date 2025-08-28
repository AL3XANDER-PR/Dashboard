// src/lib/fetchPrivateRoutes.ts
import type { DBRoute } from "@/app/router/types";
import Axios from "./apiClient";
import type { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}
export async function fetchPrivateRoutes(): Promise<DBRoute[]> {
  try {
    const response = await Axios.get("routes");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error de conexión con el servidor");
  }
}
