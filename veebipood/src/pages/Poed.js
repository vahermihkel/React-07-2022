import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// KOODI KIRJUTAMINE
// oma eelnevast projektist (koolitustel, udemy-st, ise projektid)
// ettevõttes mõnest teisest failist sama loogika üles leidmine
// Google - guugeldades

// ffc
function Poed() {
  const [poed, uuendaPoed] = useState(JSON.parse(localStorage.getItem("poed")) || [] );
  // const poed = ["Kristiine", "Mustamäe", "Ülemiste"];
  const poodRef = useRef();
  const aegRef = useRef();


  const lisaPood = () => {
    // console.log(poodRef.current.value);
    poed.push({keskus: poodRef.current.value, aeg: aegRef.current.value});
    uuendaPoed(poed.slice()); // uuendan HTMLi
    localStorage.setItem("poed", JSON.stringify(poed)); // uuendan localStorage-t
  }

  const kustutaPood = (nr) => {
    // console.log(poodRef.current.value);
    // poed.push(poodRef.current.value);
    poed.splice(nr,1);
    uuendaPoed(poed.slice());   //  "~sdasda~2022".split("~")  -> ["sdasda", "2022"]
    localStorage.setItem("poed", JSON.stringify(poed));
  }

  const sorteeriAZ = () => {
    poed.sort((a,b) => a.keskus.localeCompare(b.keskus));
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    poed.sort((a,b) => b.keskus.localeCompare(a.keskus));
    uuendaPoed(poed.slice());
  }

  return ( 
    <div>
      {/* <div>Kristiine</div>
      <div>Mustamäe</div>
      <div>Ülemiste</div> */}
      <Link to="/">
        <button>TAGASI</button>
      </Link>
      <button onClick={() => sorteeriAZ()}>Sorteeri A-Z</button>
      <button onClick={() => sorteeriZA()}>Sorteeri Z-A</button>
      {poed.map((pood, nr) => 
        <div key={pood}>
          {pood.keskus}  ({pood.aeg})
          <button onClick={() => kustutaPood(nr)}>X</button> 
        </div>)}
      <label>Keskuse nimi</label> <br />
      <input ref={poodRef} type="text"  /> <br />
      <label>Lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text"  /> <br />
      <button onClick={() => lisaPood()}>Sisesta uus pood</button>
    </div>
   );
}

export default Poed;

// Sisestus enteriga