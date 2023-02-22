import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/http-client";

const getUserPermissions = async () => {
  const response = await axiosInstance.get<string[]>(`/users/permissions`);
  return response.data;
};

export default function useGetUserPermissions(isAuthenticated: boolean) {
  const query = useQuery({
    queryKey: ["getUserPermissions"],
    queryFn: getUserPermissions,
    enabled: isAuthenticated,
  });

  return query;
}
