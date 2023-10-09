export const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getLocalStorageCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};