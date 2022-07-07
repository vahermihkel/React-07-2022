import { useState } from "react";
import { Link } from "react-router-dom";

function Ostukorv() {
  //const [ostukorv, muudaOstukorv] = useState(JSON.parse(sessionStorage.getItem("ostukorv")) || [] );
  const ostukorv = JSON.parse(sessionStorage.getItem("ostukorv")) || [];

  return ( 
    <div>
      <Link to="/">
        <button>TAGASI</button>
      </Link>
      <div>{ostukorv.map(element => <div>{element} <button>X</button><button>+</button> </div>)}</div>
    </div>
   );
}

// https://www.w3schools.com/js/js_objects.asp

export default Ostukorv;