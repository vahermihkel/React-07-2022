import { useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
  // ALGVÄÄRTUS --> mis on muutuja väärtus lehele tulles
  // MUUTUJA --> muutuv väärtus (sõnum, kogusumma, number, sisselogitud kasutaja)
  // MUUDAMUUTUJA --> funktsioon mis muudab muutujat
  const [muutuja, funktsioonMisMuudabMuutujat] = useState("algväärtus");
  // const [muutuja2, funktsioonMisMuudabMuutujat2] = useState("algväärtus");
  // const [muutuja3, funktsioonMisMuudabMuutujat3] = useState("algväärtus");
  // let kogus = 1;
  const [kogus, muudaKogus] = useState(1);
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const [veebileheKeel, muudaVeebileheKeel] = useState(localStorage.getItem("keel"));

  const muudaK6ik = () => {
    funktsioonMisMuudabMuutujat("uus1");
    // funktsioonMisMuudabMuutujat2("uus2");
    // funktsioonMisMuudabMuutujat3("uus3");
  }

  const v2hendaKogust = () => {
    //kogus = 0;
    muudaKogus(kogus - 1);
    console.log(kogus);
    // brauseri lehel parem klõps -> inspect -> console tab
  }

  const suurendaKogust = () => {
    // kogus = 2;
    muudaKogus(kogus + 1);
    console.log(kogus);
  }

  // const muudaEestikeelseks = () => {
  //   localStorage.setItem("keel", "ee");
  //   muudaVeebileheKeel("ee")
  // }

  // const muudaInglisekeelseks = () => {
  //   localStorage.setItem("keel", "en");
  //   muudaVeebileheKeel("en");
  // }

  // const muudaVenekeelseks = () => {
  //   localStorage.setItem("keel", "ru");
  //   muudaVeebileheKeel("ru");
  // }

  const muudaKeel = (lang) => {
    localStorage.setItem("keel", lang);
    muudaVeebileheKeel(lang);
  }

  const lisaOstukorvi = (klikitudToode) => {
    let ostukorv = sessionStorage.getItem("ostukorv");
    ostukorv = JSON.parse(ostukorv) || [];
    ostukorv.push(klikitudToode);
    ostukorv = JSON.stringify(ostukorv);
    sessionStorage.setItem("ostukorv", ostukorv);
  }

  return ( 
  <div>
    {/* <img src="/logo192.png" alt="" />
    <img src={ require("../assets/logo512.png") } alt="" /> */}
    <div>AVALEHT</div>
    <Link to="/ostukorv">
      <button>OSTUKORVI</button>
    </Link>
    <Link to="/lisa-toode">
      <button>LISA TOODE</button>
    </Link>
    <Link to="/poed">
      <button>HALDA POODE</button>
    </Link>
    <Link to="/halda">
      <button>HALDA TOOTEID</button>
    </Link>
    <div>{muutuja}</div>
    { muutuja === "uus väärtus" && <div>Väärtust on muudetud</div>}
    <button onClick={() => funktsioonMisMuudabMuutujat("uus väärtus")}>Pane uus väärtus</button>
    <button onClick={() => muudaK6ik()}>Pane kõigile uus väärtus</button> <br />

    <div>{tooted.map(element => 
      <div key={element.nimi}>
        <Link to={"/toode/" + element.nimi}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
          <div>{element.aktiivne}</div>
        </Link>
        <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
      </div>)}
    </div>

    <button disabled={kogus < 1} onClick={() => v2hendaKogust()}>-</button>
    <div>{kogus}</div>
    <button onClick={() => suurendaKogust()}>+</button> <br />
    { kogus < 0 && <div>Kogus ei saa olla miinuses!</div>}

    <button onClick={() => muudaKeel('ee')}>Eesti keel</button>
    <button onClick={() => muudaKeel('en')}>Inglise keel</button>
    <button onClick={() => muudaKeel('ru')}>Vene keel</button>


    { veebileheKeel === "ee" && <div>Leht on eesti keelne</div>}
    { veebileheKeel === "en" && <div>Leht on inglise keelne</div>}
    { veebileheKeel === "ru" && <div>Leht on vene keelne</div>}
  </div> );
}

export default Avaleht;

// tumesinine - HTML: tag, JS: function, const
// sinine - muutuja mis on minu JavaScriptis
// helesinine - HTML: atribuut: onClick, className, disabled, src 
//        JS: üldkasutatav muutuja localStorage, console, JSON, window
// kollane - funktsioonid
// valge - väljakuvatav
// oranž - jutumärkides olev väärtus
// roheline (suur täht) - klass, mida peab importima
// lilla - import / export / return