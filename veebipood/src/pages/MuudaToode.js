import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 1. leidma URL parameetrite seast muutuja väärtuse
// 2. võtma kõik tooted, et nende seast otsingut läbi viia
// 3. otsin õige toote üles selle nime alusel (kellel on täpselt sama nimi)
// 4. võin nime ja hinna välja kuvada

function MuudaToode() {
  // localhost:3000/muuda/:tooteNimi
  const { tooteNimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const toode = tooted.find(element => element.nimi === tooteNimi);
  const j2rjekorraNumber = tooted.indexOf(toode);
  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  const muuda = () => {
    //     0        1       2
    // ["camel", "duck", "bison"][1] = "bird"   ---> ["camel", "bird", "bison"]
    tooted[j2rjekorraNumber] = {
      nimi: nimiRef.current.value, 
      hind: hindRef.current.value, 
      aktiivne: aktiivneRef.current.checked
    };
    // salvestus localStorage-sse
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda");
  }

  return ( 
    <div>
      { toode !== undefined && 
      <div>
        {/* <div>{toode.nimi}</div>
        <div>{toode.hind}</div> */}
        <label>Toote nimi</label> <br />
        <input ref={nimiRef} defaultValue={toode.nimi} type="text" /> <br />
        <label>Toote hind</label> <br />
        <input ref={hindRef} defaultValue={toode.hind} type="price" /> <br />
        <label>Toote aktiivsus</label> <br />
        <input ref={aktiivneRef} defaultChecked={toode.aktiivne} type="checkbox" /> <br />
        <button onClick={() => muuda()}>Muuda</button>
      </div>}
    </div>
   );
}

export default MuudaToode;