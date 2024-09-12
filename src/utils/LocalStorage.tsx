import { FieldValues } from "react-hook-form";
import { keyName, keyPassword } from "../lib/KeyName";

export const setToLocalStorage = (value: FieldValues) => {
  localStorage.setItem(keyName, value.username);
  localStorage.setItem(keyPassword, value.password);
};

export const removeLogedUser = () => {
  localStorage.removeItem(keyName);
  localStorage.removeItem(keyPassword);
  localStorage.removeItem("privateKey");
  localStorage.removeItem("address");
  window.location.reload();
};
