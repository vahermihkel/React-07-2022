import { Button } from "react-bootstrap";

//categoryProducts={filteredProducts} 
function SortButtons(props) {
  const sortAZ = () => {
    // muteerib - mutates
                      // pageProducts={products}
    props.categoryProducts.sort((a,b)=> a.name.localeCompare(b.name));
    // updatePageProducts={setProducts}
    props.updatePageProducts(props.categoryProducts.slice(0,20));
    props.updatePage(1);
  }

  const sortZA = () => {
    props.categoryProducts.sort((a,b)=> b.name.localeCompare(a.name));
    props.updatePageProducts(props.categoryProducts.slice(0,20));
    props.updatePage(1);
  }

  const sortPriceAsc = () => {
    props.categoryProducts.sort((a,b)=> a.price - b.price);
    props.updatePageProducts(props.categoryProducts.slice(0,20));
    props.updatePage(1);
  }

  const sortPriceDesc = () => {
    props.categoryProducts.sort((a,b)=> b.price - a.price);
    props.updatePageProducts(props.categoryProducts.slice(0,20));
    props.updatePage(1);
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