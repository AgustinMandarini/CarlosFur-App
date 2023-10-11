export const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getLocalStorageCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (val) => {
  localStorage.setItem("token", val);
};
