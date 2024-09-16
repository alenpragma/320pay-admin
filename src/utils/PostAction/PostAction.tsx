import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../axiosConfig";
import Swal from "sweetalert2";

export const usePostAction = (
  url: string,
  refetch: () => void,
  handleModal: (e: any) => void
) => {
  const mutation = useMutation({
    mutationFn: async (postData: FieldValues) => {
      const response = await axiosInstance.post(url, postData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success === 200) {
        Swal.fire({
          title: "Plan added successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal-modal",
          },
        });
        refetch();
      }
      handleModal("");
    },
    onError: () => {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        customClass: {
          popup: "custom-swal-modal",
        },
      });
    },
  });

  return mutation;
};
