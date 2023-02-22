import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../lib/http-client";

function useVerifyEmailMutation() {
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: async () => {
      try {
        const res = await axiosInstance.post("/users/verify-email");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: () => {
      toast("Verification email sent.", {
        type: "success",
      });
    },
    onError: () => {
      toast("Failed to send verification email", {
        type: "error",
      });
    },
  });
}

export default useVerifyEmailMutation;
