import { BASE_URL_3 } from "../config/config";
import { invokeApi } from "../utilities/invokeApi";

export const getOrders = () => {
  const reqObj = {
    path: `${BASE_URL_3}order?limit=200&skip=0`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};
export const addOrder = (data) => {
  const reqObj = {
    path: BASE_URL_3 + "order",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
