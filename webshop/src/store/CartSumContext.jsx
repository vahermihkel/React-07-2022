import React, { useState } from "react";

const CartSumContext = React.createContext({
  cartSum: 0,
  newCartSum: (newNumber) => {}
});

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    let cartSum = 0;
    cart.forEach(element => cartSum += element.product.price * element.quantity);
    return cartSum;
  }

  const cartSumHandler = (newNumber) => {
    setCartSum(newNumber);
  }

  return (
  <CartSumContext.Provider value={{
    cartSum: cartSum,
    newCartSum: cartSumHandler
  }}>
    {props.children}
  </CartSumContext.Provider>)
} 

export default CartSumContext;