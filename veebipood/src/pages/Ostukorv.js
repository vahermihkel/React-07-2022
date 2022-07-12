import { useState } from "react";
import { Link } from "react-router-dom";

function Ostukorv() {
  const [ostukorv, muudaOstukorv] = useState(JSON.parse(sessionStorage.getItem("ostukorv")) || [] );
  // const ostukorv = JSON.parse(sessionStorage.getItem("ostukorv")) || [];

  const kustuta = (index) => {
    ostukorv.splice(index,1);
    muudaOstukorv(ostukorv.slice());
    sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  const lisa = (element) => {
    ostukorv.push(element);
    muudaOstukorv(ostukorv.slice());
    sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  // kokkuarvutuse .forEach() abil
  // tühjenda fuktsiooni
  // mitu toodet on ostukorvis
  // dünaamilist väljakuvamist

  const tyhjenda = () => {
    muudaOstukorv([]); // HTML
    sessionStorage.setItem("ostukorv", JSON.stringify([])); // salvestuseks
  }

  const arvutaKogusumma = () => {
    let kogusumma = 0;
    // [{ni: "Tes", hind: "31231"}, {ni: "Nob", "231231"}].forEach(element => )
    // ({ni: "Tes", hind: "31231"} =>  31231   =  0  +  31231
    // ({ni: "Nob", "231231"} =>  31331   =  31231 + 100
    ostukorv.forEach(element => kogusumma = kogusumma + Number(element.hind));
    return kogusumma;
  }

  return ( 
    <div>
      <Link to="/">
        <button>TAGASI</button>
      </Link>
      { ostukorv.length > 0 && <div>Ostukorvis on {ostukorv.length} eset</div>}
      { ostukorv.length > 0 && <button onClick={() => tyhjenda()}>Tühjenda</button>}
      { ostukorv.length === 0 && <div>Ostukorv on tühi</div> }
      <div>{ostukorv.map((element, index) => 
        <div key={index}>
          {element.nimi} - {element.hind} €
          <button onClick={() => kustuta(index)}>X</button>
          <button onClick={() => lisa(element)}>+</button> 
        </div>)}
      </div>
      { ostukorv.length > 0 && <div>Kokku {arvutaKogusumma()} €</div>}
    </div>
   );
}

// https://www.w3schools.com/js/js_objects.asp
// Firebase - veebimajutusteenus
// Üksik toode - URL parameetri

export default Ostukorv;