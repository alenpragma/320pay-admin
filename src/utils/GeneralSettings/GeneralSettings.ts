import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";

const fetchToken = async () => {
  const response = await axiosInstance.get(`/settings`);
  return response;
};

const {
  data: generalSettings,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ["generalSettings"],
  queryFn: fetchToken,
  staleTime: 10000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
});
