import { useContext, useState } from "react";
import ParcelMachine from "../components/cart/ParcelMachine";
import Payment from "../components/cart/Payment";
import styles from '../css/Cart.module.css';
// import { cartSumService } from "../store/cartSumService";
import CartSumContext from "../store/CartSumContext";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const cartSumCtx = useContext(CartSumContext);

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    // cartSumService.sendCartSum(calculateCartSum());
    cartSumCtx.newCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    // cartSumService.sendCartSum(calculateCartSum());
    cartSumCtx.newCartSum(calculateCartSum());
  }

  const removeFromCart = (index) => {
    cart.splice(index,1); 
    setCart(cart.slice()); 
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // cartSumService.sendCartSum(calculateCartSum()); 
    cartSumCtx.newCartSum(calculateCartSum());
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  const emptyCart = () => {
    setCart([]); 
    sessionStorage.setItem("cart", JSON.stringify([])); 
    cartSumCtx.newCartSum(calculateCartSum());
  }

  return ( 
  <div>
    <button onClick={emptyCart}>: Tühjenda nupp</button>

    {cart.map((element, index) => 
      <div key={element.product.id} className={styles.cartProduct}>
        <img className={styles.image} src={element.product.image} alt="" />
        <div className={styles.name}>{element.product.name}</div>
        <div className={styles.price}>{element.product.price.toFixed(2)} €</div>
        <div className={styles.controls}>
          <img 
            className={styles.button} 
            onClick={() => decreaseQuantity(index)} 
            src={require("../assets/minus.png")} 
            alt="" />
          <div className={styles.quantity}>{element.quantity} tk</div>
          <img 
            className={styles.button} 
            onClick={() => increaseQuantity(index)} 
            src={require("../assets/plus.png")} 
            alt="" />
        </div>
        <div className={styles.total}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img 
          className={styles.button} 
          onClick={() => removeFromCart(index)} 
          src={require("../assets/delete.png")} 
          alt="" />
      </div>)}

      {cart.length > 0 && 
        <div className={styles.bottom}>
          <ParcelMachine />

          <div className={styles.sum}>{calculateCartSum()} €</div>
          <Payment totalSum={calculateCartSum()} />
        </div>}

      <div>KODUS: MINGI ILUS PILT KUI OSTUKORV ON TÜHI (length on 0)</div>
  </div> );
}

export default Cart;