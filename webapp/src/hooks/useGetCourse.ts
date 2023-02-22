import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/http-client";
import { Course } from "../types/courses";

export const getCourse = async (courseId: string) => {
  try {
    const response = await axiosInstance.get<Course>(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function useGetCourse(courseId: string) {
  return useQuery({
    queryKey: ["getCourse", courseId],
    queryFn: () => getCourse(courseId),
  });
}
