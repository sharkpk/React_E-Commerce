import { BASE_URL_2 } from "../config/config";
import { invokeApi } from "../utilities/invokeApi";

export const getProducts = (category = "", limit = 100, skip = 0) => {
  const reqObj = {
    path: `${BASE_URL_2}product?limit=${limit}&skip=${skip}&category=${category}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};
export const detailProduct = (id) => {
  const reqObj = {
    path: `${BASE_URL_2}product/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(reqObj);
};
export const addProduct = (data) => {
  const reqObj = {
    path: BASE_URL_2 + "product",
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "content-type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
