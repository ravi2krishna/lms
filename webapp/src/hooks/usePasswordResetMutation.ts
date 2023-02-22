import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../lib/http-client";

function usePasswordResetMutation() {
  return useMutation({
    mutationKey: ["passwordReset"],
    mutationFn: async () => {
      try {
        const res = await axiosInstance.post<string>("/users/reset-password");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: () => {
      toast("Password reset email sent.", {
        type: "success",
      });
    },
    onError: () => {
      toast("Failed to send password reset link.", {
        type: "error",
      });
    },
  });
}

export default usePasswordResetMutation;
