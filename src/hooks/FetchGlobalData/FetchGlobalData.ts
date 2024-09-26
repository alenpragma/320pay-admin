import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

const fetchSettingsData = async () => {
  const { data } = await axiosInstance("settings");
  return data[0];
};

export const useSettingsData = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: fetchSettingsData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
