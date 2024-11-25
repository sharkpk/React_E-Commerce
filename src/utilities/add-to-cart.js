import { enqueueSnackbar } from "notistack";

export const handleCart = (product, addProduct = true, showMessage = true) => {
  const payload = { ...product, quantity: 1 };
  const prevItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  let itemExist = false;
  let newPayload = [];
  newPayload = prevItems.map((prevProduct) => {
    if (prevProduct._id === payload._id) {
      itemExist = true;

      return {
        ...prevProduct,
        quantity: addProduct
          ? prevProduct.quantity + 1
          : prevProduct.quantity - 1,
      };
    }
    return prevProduct
  }).filter(prevProduct=>prevProduct.quantity>0);
  
  if (!itemExist) {
    newPayload.push(payload);
  }
  localStorage.setItem("cart", JSON.stringify(newPayload));
  if (showMessage) {
    if (addProduct) {
      enqueueSnackbar(`${product.name} added to cart!`, { variant: "success" });
    } else {
      enqueueSnackbar(`${product.name} removed from cart!`, {
        variant: "success",
      });
    }
  }

  return newPayload;
};
