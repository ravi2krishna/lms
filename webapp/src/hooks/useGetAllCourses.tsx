import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../lib/http-client";
import { CourseNavListItem } from "../types/courses";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get<CourseNavListItem[]>(
      "/courses/all"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
  }
};

export default function useGetAllCourses() {
  return useQuery({
    queryKey: ["getAllCourses"],
    queryFn: getAllCourses,
  });
}
