import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const apiErrorHandler = (err: unknown) => {
  const error = err as { message: string };
  if (error.message) {
    toast(error.message);
  } else {
    toast("Unknow error, please contact support.");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError: apiErrorHandler,
    },
    mutations: {
      onError: apiErrorHandler,
    },
  },
});
