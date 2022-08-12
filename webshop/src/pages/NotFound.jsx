import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return ( 
    <div>
      <h3>404</h3>
      <h4>Lehekülge ei leitud</h4>
      <Link to="/">
        <Button variant="secondary">Tagasi avalehele</Button>
      </Link>
    </div> );
}

export default NotFound;