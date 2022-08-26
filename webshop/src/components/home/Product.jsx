import { Button  } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { cartSumService } from "../../store/cartSumService";
import { toast } from 'react-toastify';
import CartSumContext from "../../store/CartSumContext";
import { useContext } from "react";

function Product(props) {
  const cartSumCtx = useContext(CartSumContext);

  const removeFromCart = (productClicked) => {
    const productIndex = props.products.indexOf(productClicked);
    if (props.products[productIndex].count > 0) {
      props.products[productIndex].count--;
      props.setProducts(props.products.slice());
    }

    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      // cart[index].quantity = cart[index].quantity - 1;
      // cart[index].quantity -= 1;
      cart[index].quantity--;

      if (cart[index].quantity === 0) {
        cart.splice(index,1);
      }

      let cartSum = 0;
      // cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
      cart.forEach(element => cartSum += element.product.price * element.quantity);
      // cartSumService.sendCartSum(cartSum.toFixed(2));
      cartSumCtx.newCartSum(cartSum);

      cart = JSON.stringify(cart);
      sessionStorage.setItem("cart", cart);
      toast.success('Edukalt ostukorvist vähendatud!', {
        position: "bottom-right",
        theme: "dark"
        });
    } 
  }

  const addToCart = (productClicked) => {
    const productIndex = props.products.indexOf(productClicked);
    props.products[productIndex].count++;
    props.setProducts(props.products.slice());

    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push({product: productClicked, quantity: 1});
    }

    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    // cartSumService.sendCartSum(cartSum.toFixed(2));
    cartSumCtx.newCartSum(cartSum);

    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
    toast.success('Edukalt lisatud ostukorvi!', {
      position: "bottom-right",
      theme: "dark"
      });
  }


  return ( 
    <div>
      {/* <Link to={"/toode/" + element.id}> */}
      <Link to={`/toode/${props.element.id}`}>
        <img src={props.element.image} alt="" />
        <div>{props.element.name}</div>
        <div>{props.element.price}</div>
      </Link>
      <Button variant="danger" onClick={() => removeFromCart(props.element)}>Eemalda ostukorvist</Button>
      <span>{props.element.count} tk</span>
      <Button variant="success" onClick={() => addToCart(props.element)}>Lisa ostukorvi</Button>
    </div> );
}

export default Product;