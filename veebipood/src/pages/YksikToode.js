import { useParams } from "react-router-dom";

function YksikToode() {
  // localhost:3000/toode/:nimi
  const { nimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const toode = tooted.find(element => element.nimi === nimi);

  return ( 
    <div>
      {toode !== undefined && 
      <div>
        <div>{toode.nimi}</div>
        <div>{toode.hind}</div>
      </div>}
      {toode === undefined && 
      <div>Toodet ei leitud!</div>}
    </div> );
}

export default YksikToode;