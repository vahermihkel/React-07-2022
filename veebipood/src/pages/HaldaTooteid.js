// 1. võtan kõik tooted localStorage-st
// 2. võtan jutumärgid maha VÕI tuleb tühi massiiv
// 3. kuvame HTMLs välja .map() abil
// 4. teeme igale tootele HTMLs 2 nuppu: [muuda] [x]
// 5. teen x nupule funktsiooni, mis võimaldab kustutada
// 6. localStorage.setItem(); <--- salvestab, aga ei uuendata HTMLi ---- töötab pärast refreshi
// 7. teeme useState kujule ülemised tooted
// 8. uuendame HTMLi, kutsudes välja uuendaTooted(tooted.slice());
// 9. võimaldame muutma minna, kirjutades muuda nupu ümber Link ja saates sinna toote nime

import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);
  // const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

  const kustuta = (j2rjekorraNumber) => {
    tooted.splice(j2rjekorraNumber, 1); // splice kustutamiseks
    localStorage.setItem("tooted", JSON.stringify(tooted));
    uuendaTooted(tooted.slice()); // slice koopia tegemiseks
  }

  const aktiivsed = () => {
    // ['ant', 'bison', 'camel', 'duck', 'bison']
    // const vastus = .filter(element => element.includes('b'))
    // ['ant', 'camel']
    // ['bison', 'bison']
    const vastus = tooted.filter(element => element.aktiivne === true);
    uuendaTooted(vastus);
  }

  const k6ik = () => {
    const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
    uuendaTooted(tooted);
  }

  // x document.getElementById();
  // x document.createElement()
  // x addEventListener
  return ( 
  <div>
    <button onClick={() => aktiivsed()}>Näida vaid aktiivseid</button>
    <button onClick={() => k6ik()}>Näita kõiki</button>
    {tooted.map((element, j2rjekorraNumber) => 
    <div>
      <div>{element.nimi}</div>
      <div>{element.hind}</div>
      <button onClick={() => kustuta(j2rjekorraNumber)}>X</button>
      <Link to={"/muuda/" + element.nimi}>
        <button>Muuda</button>
      </Link>
    </div>)}
  </div> );
}

export default HaldaTooteid;