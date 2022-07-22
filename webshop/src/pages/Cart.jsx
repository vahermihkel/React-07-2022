import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  return ( 
  <div>
    {cart.map(element => 
      <div>
        <img src={element.product.image} alt="" />
        <div>{element.product.name}</div>
        <div>{element.product.price} €</div>
        <button>-</button>
        <div>{element.quantity} tk</div>
        <button>+</button>
        <div>{element.product.price * element.quantity} tk</div>
        <button>x</button>
      </div>)}
  </div> );
}

export default Cart;