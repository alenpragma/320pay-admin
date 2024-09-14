import Swal from "sweetalert2";
import axiosInstance from "../axiosConfig";

export const handleDeleteFn = async (url: string, resetData: () => void) => {
  console.log(url);
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this action!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "custom-swal-modal",
    },
  });

  if (result.isConfirmed) {
    try {
      const response = await axiosInstance.get(url);
      console.log(response);
      if (response?.data?.success === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          customClass: {
            popup: "custom-swal-modal",
          },
        });
        resetData();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting your file.",
        icon: "error",
        customClass: {
          popup: "custom-swal-modal",
        },
      });
    }
  }
};
