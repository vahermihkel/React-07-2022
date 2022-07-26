import { useRef, useState } from "react";
import parcelMachinesFromFile from '../omniva.json';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const parcelMachines = parcelMachinesFromFile.filter(element => element.A0_NAME === "EE");
  const parcelMachineRef = useRef();
  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine") || "");

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice()); // uuendab HTMLi -> .slice koopia jaoks
    sessionStorage.setItem("cart", JSON.stringify(cart)); // uuendab salvestust
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice()); // uuendab HTMLi -> .slice koopia jaoks
    sessionStorage.setItem("cart", JSON.stringify(cart)); // uuendab salvestust
  }

  const removeFromCart = (index) => {
    cart.splice(index,1); // kustutab ÜKS tk
    setCart(cart.slice()); // uuendab HTMLi -> .slice koopia jaoks
    sessionStorage.setItem("cart", JSON.stringify(cart)); // uuendab salvestust
  }

  // eesti keelse projekti järgi - ostukorvi kogusumma
  // jälgida, et mul on lisaks hinnale ka kogus

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum;
  }

  const pmSelected = () => {
    setSelectedPM(parcelMachineRef.current.value);
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
  }

  const deleteSelectedPM = () => {
    setSelectedPM("");
    sessionStorage.removeItem("parcelMachine");
  }

  return ( 
  <div>
    {cart.map((element, index) => 
      <div>
        <img src={element.product.image} alt="" />
        <div>{element.product.name}</div>
        <div>{element.product.price} €</div>
        <button onClick={() => decreaseQuantity(index)}>-</button>
        <div>{element.quantity} tk</div>
        <button onClick={() => increaseQuantity(index)}>+</button>
        <div>{element.product.price * element.quantity} tk</div>
        <button onClick={() => removeFromCart(index)}>x</button>
      </div>)}

      {selectedPM === "" && <select onChange={pmSelected} ref={parcelMachineRef}>
        {parcelMachines.map(element => <option>{element.NAME}</option>)}
      </select>}
      {selectedPM !== "" && <div>{selectedPM}<button onClick={deleteSelectedPM}>x</button></div>}

      <div>{calculateCartSum()} €</div>
  </div> );
}

export default Cart;