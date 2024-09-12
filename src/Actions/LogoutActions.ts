// src/utils/authUtils.ts
import Swal from "sweetalert2";

export const handleLogOut = (navigate: (a: string) => void, removePaymentToken: () => void) => {
  Swal.fire({
    text: "Are you sure you want to logout?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "custom-swal-modal",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      removePaymentToken();
      navigate("/login");
    }
  });
};
