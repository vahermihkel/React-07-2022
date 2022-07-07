import { useRef, useState } from "react";

// ffc
function Poed() {
  const [poed, uuendaPoed] = useState(JSON.parse(localStorage.getItem("poed")) || [] );
  // const poed = ["Kristiine", "Mustamäe", "Ülemiste"];
  const poodRef = useRef();


  const lisaPood = () => {
    // console.log(poodRef.current.value);
    poed.push(poodRef.current.value);
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

  return ( 
    <div>
      {/* <div>Kristiine</div>
      <div>Mustamäe</div>
      <div>Ülemiste</div> */}
      {poed.map((pood, nr) => <div key={pood}>{pood} <button onClick={() => kustutaPood(nr)}>X</button> </div>)}
      <input ref={poodRef} type="text"  /> <br />
      <button onClick={() => lisaPood()}>Sisesta uus pood</button>
    </div>
   );
}

export default Poed;

// Sisestus enteriga