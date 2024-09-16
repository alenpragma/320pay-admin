import Swal from "sweetalert2";

export const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be update data?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Update",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "custom-swal-modal",
    },
  });