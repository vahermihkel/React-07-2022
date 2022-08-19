import { Button } from "react-bootstrap";

function SortButtons(props) {
  const sortAZ = () => {
    // muteerib - mutates
                      // pageProducts={products}
    const result = [...props.categoryProducts].sort((a,b)=> a.name.localeCompare(b.name));
    // updatePageProducts={setProducts}
    props.updatePageProducts(result.slice(0,20));
  }

  const sortZA = () => {
    const result = [...props.categoryProducts].sort((a,b)=> b.name.localeCompare(a.name));
    props.updatePageProducts(result.slice(0,20));
  }

  const sortPriceAsc = () => {
    const result = [...props.categoryProducts].sort((a,b)=> a.price - b.price);
    props.updatePageProducts(result.slice(0,20));
  }

  const sortPriceDesc = () => {
    const result = [...props.categoryProducts].sort((a,b)=> b.price - a.price);
    props.updatePageProducts(result.slice(0,20));
  }

  return ( 
  <div>
    <Button onClick={sortAZ}>Sort A-Z</Button>
    <Button onClick={sortZA}>Sort Z-A</Button>
    <Button onClick={sortPriceAsc}>Hind kasvavalt</Button>
    <Button onClick={sortPriceDesc}>Hind kahanevalt</Button>
  </div> );
}

export default SortButtons;