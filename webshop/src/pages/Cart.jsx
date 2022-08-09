import { useEffect, useRef, useState } from "react";
// import parcelMachinesFromFile from '../omniva.json';
import styles from '../css/Cart.module.css';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  // const parcelMachines = parcelMachinesFromFile.filter(element => element.A0_NAME === "EE");
  const [parcelMachines, setParcelMachines] = useState([]);
  const parcelMachineRef = useRef();
  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine") || "");

  useEffect(() => { // <-- import
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(data => {
        const result = data.filter(element => element.A0_NAME === "EE");
        setParcelMachines(result);
      }  ) // <- useState
  }, []);

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

      <div className={styles.bottom}>
        {selectedPM === "" && <select onChange={pmSelected} ref={parcelMachineRef}>
          {parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}
        </select>}
        {selectedPM !== "" && <div>{selectedPM}<button onClick={deleteSelectedPM}>x</button></div>}

        <div className={styles.sum}>{calculateCartSum().toFixed(2)} €</div>
      </div>
  </div> );
}

export default Cart;