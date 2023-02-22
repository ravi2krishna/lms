import axios from "axios";
import { APIError } from "../types/common";

export const axiosAPIErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data as APIError;
    throw new Error(err.message);
  }
  throw new Error("Something went wrong, please try later.");
};
