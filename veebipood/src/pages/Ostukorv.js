import { Link } from "react-router-dom";

function Ostukorv() {
  return ( 
    <div>
      <Link to="/">
        <button>TAGASI</button>
      </Link>
      <div>OSTUKORV</div>
    </div>
   );
}

export default Ostukorv;