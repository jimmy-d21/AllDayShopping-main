export const calculateTotalCartQuantity = (carts) => {
  const cartsData = [...carts];

  const cartQuantity = cartsData.reduce((acc, cart) => acc + cart.quantity, 0);
  return cartQuantity;
};
