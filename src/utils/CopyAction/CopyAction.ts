import { toast } from "react-toastify";

export const copyToClipboard = (textToCopy: string | null) => {
  navigator.clipboard
    .writeText(textToCopy || "")
    .then(() => {})
    .catch((err) => {});
};
