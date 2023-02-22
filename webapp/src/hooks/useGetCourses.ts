import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../lib/http-client";
import { CourseListItem } from "../types/courses";

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get<CourseListItem[]>("courses");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
  }
};

export default function useGetCourses() {
  return useQuery({
    queryKey: ["getCourses"],
    queryFn: getCourses,
  });
}
