import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../axiosConfig";
import Swal from "sweetalert2";

export const usePostAction = (
  url: string,
  refetch: () => void,
  handleModal?: (e: any) => void
) => {
  const mutation = useMutation({
    mutationFn: async (postData: FieldValues) => {
      const response = await axiosInstance.post(url, postData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        Swal.fire({
          title: "Successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal-modal",
          },
        });
        refetch();
      }
      if (handleModal) {
        handleModal("");
      }
    },
    onError: () => {
      Swal.fire({
        text: "Something went wrong",
        icon: "warning",
        customClass: {
          popup: "custom-swal-modal",
        },
      });
    },
  });

  return mutation;
};
