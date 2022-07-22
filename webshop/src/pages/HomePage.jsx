import { useState } from "react";
import { Button } from "react-bootstrap";
import productsFromFile from "../products.json";

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);
  const categories = [...new Set(productsFromFile.map(element => element.category))];
  // .map( => UUS_VÄÄRTUS)     [{n:"1"}, {n:"2"}, {n:"3"}]   ---->   ["1","2","3"] asenduseks
  // .sort( => Pluss või miinusmärk)    [{n:"1"},{n:"2"}, {n:"3"}]  ---> [{n:"3"}, {n:"2"}, {n:"1"}]
  // .filter( => TRUE või FALSE )        [{n:"1"}, {n:"2"}, {n:"3"}]  -->   [{n:"2"}, {n:"3"}]

  const sortAZ = () => {
    // muteerib - mutates
    products.sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b)=> b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b)=> a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b)=> b.price - a.price);
    setProducts(products.slice());
  }

  const filterByCategory = (categoryClicked) => {
    // tagastab - returns
    if (categoryClicked === 'all') {
      setProducts(productsFromFile);
    } else {
      const result = productsFromFile.filter(element => element.category === categoryClicked);
      setProducts(result);
    }
  }

  // {"id":772,"image":"https.bp","name":"Display","price":20.37,"description":"Display Stand","category":"star wars","active":true}
  // .push() ---> lisab toote massiivile juurde [].push({})  -> [{}].push({})  -->  [{},{}]
  // {product: {id: 7, name: ""}, quantity: 1}

          // {"id":772,"image":"https.bp","name":"Display","price":20.37,"description":"Display Stand","category":"star wars","active":true}
  const addToCart = (productClicked) => {
    console.log(productClicked);
    // null || "[{"id":772,"image":"https.bp","name":"Display","price":20.37,"description":"Display Stand","category":"star wars","active":true}]"
    let cart = sessionStorage.getItem("cart");
    console.log(cart);
    // [] || [{"id":772,"image":"https.bp","name":"Display","price":20.37,"description":"Display Stand","category":"star wars","active":true}]
    cart = JSON.parse(cart) || [];
    console.log(cart);
    //cart.push() ??? if else
    // -1 ||  >= 0
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    console.log(index);
    if (index >= 0) {
    //  [{},{}][index] = {};
    //{product: {"id":772,"name":"Display"}, quantity: 2}
      cart[index].quantity = cart[index].quantity + 1;
    } else {
    //         {product: {"id":772,"name":"Display"}, quantity: 1}
      cart.push({product: productClicked, quantity: 1});
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  return ( 
  <div>
    <div onClick={() => filterByCategory('all')}>Kõik kategooriad</div>
    {categories.map(element => <div onClick={() => filterByCategory(element)}>{element}</div>)}
    <Button onClick={sortAZ}>Sort A-Z</Button>
    <Button onClick={sortZA}>Sort Z-A</Button>
    <Button onClick={sortPriceAsc}>Hind kasvavalt</Button>
    <Button onClick={sortPriceDesc}>Hind kahanevalt</Button>
    <div>Tooteid on {products.length} tk</div>
    {products.map(element => 
      <div>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <Button variant="success" onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}
  </div> );
}

export default HomePage;