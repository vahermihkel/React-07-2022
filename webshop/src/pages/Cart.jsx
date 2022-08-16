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

  const pay = () => {

    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateCartSum(),
      "order_reference": Math.random() * 999999,
      "nonce": "a9b7f7e7" + new Date() + Math.random() * 999999,
      "timestamp": new Date(),
      "customer_url": "https://react-0722.web.app"
      }      

    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(res => res.json())
    .then(data => {
      if (data.payment_link === undefined) {
        setPaymentMessage("Makse ei õnnestunud, proovi mõne aja pärast uuesti");
      } else {
        window.location.href = data.payment_link;
      }
    })
  }

  const [paymentMessage, setPaymentMessage] = useState("");

  return ( 
  <div>
    <button>KODUS: Tühjenda nupp</button>

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
          {selectedPM === "" && <select onChange={pmSelected} ref={parcelMachineRef}>
            {parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}
          </select>}
          {selectedPM !== "" && <div>{selectedPM}<button onClick={deleteSelectedPM}>x</button></div>}

          <div className={styles.sum}>{calculateCartSum().toFixed(2)} €</div>
          <button onClick={pay}>Maksa</button>
          <div>{paymentMessage}</div>
        </div>}

      <div>KODUS: MINGI ILUS PILT KUI OSTUKORV ON TÜHI (length on 0)</div>
  </div> );
}

export default Cart;