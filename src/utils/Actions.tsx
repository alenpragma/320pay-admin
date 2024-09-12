import { toast } from "react-toastify";

export const copyToClipboard = (textToCopy: string | null) => {
  navigator.clipboard
    .writeText(textToCopy || "")
    .then(() => {
      toast("Copied to clipboard!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        draggable: true,
        style: {
          backgroundColor: "#5734DC",
          color: "white",
          width: "fit-content",
          height: "fit-content",
          borderRadius: "8px",
          margin: "auto",
          padding: "0px 20px"
        },
      });
    })
    .catch((err) => {
      // console.error("Failed to copy text: ", err);
    });
};
