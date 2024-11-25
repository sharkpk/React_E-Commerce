import { BASE_URL_1 } from "../config/config";
import { invokeApi } from "../utilities/invokeApi";

export const registerUser = (data) => {
  const reqObj = {
    path: BASE_URL_1 + "customer",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
export const loginUser = (data) => {
  const reqObj = {
    path: BASE_URL_1 + "auth/login",
    method: "POST",
    postData: data,
  };
  return invokeApi(reqObj);
};
