import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../lib/http-client";

function useCourseFilesUpdateMutation() {
  return useMutation({
    mutationKey: ["updateCourseFiles"],
    mutationFn: async (data: FormData) => {
      try {
        const res = await axiosInstance.put("/courses/update-files", data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
  });
}

export default useCourseFilesUpdateMutation;
