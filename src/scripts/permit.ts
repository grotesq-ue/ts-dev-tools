import { PERMISSION_REQUEST_TEXT } from "../constants";

export const permit = () => {
  const permission = prompt(PERMISSION_REQUEST_TEXT)?.toLocaleLowerCase().trim();
  const permitted = !permission || ["y", "yes"].includes(permission);
  console.log("\n");
  return permitted;
};
