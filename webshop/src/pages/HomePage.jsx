import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import productsFromFile from "../products.json";

function HomePage() {
  const [databaseProducts, setDatabaseProducts] = useState([]); // andmebaasist võetud, aga mida ei muuda pärast seda kunagi
  const [products, setProducts] = useState([]); // väljanäidatavad tooted, mida järjepidevalt muudan
  const categories = [...new Set(databaseProducts.map(element => element.category))]; // andmebaasitooteid
  const [activeCategory, setActiveCategory] = useState("all");
  // .map( => UUS_VÄÄRTUS)     [{n:"1"}, {n:"2"}, {n:"3"}]   ---->   ["1","2","3"] asenduseks    .length sama
  // .sort( => Pluss või miinusmärk)    [{n:"1"},{n:"2"}, {n:"3"}]  ---> [{n:"3"}, {n:"2"}, {n:"1"}]   .length sama
  // .filter( => TRUE või FALSE )        [{n:"1"}, {n:"2"}, {n:"3"}]  -->   [{n:"2"}, {n:"3"}]   .length väheneb

  // aadress, mille andis Firebase / products.json
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // uef
  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        setDatabaseProducts(data);
        setProducts(data);
      })
  }, []);

  const sortAZ = () => {
    // muteerib - mutates
    const result = [...products].sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(result);
  }

  const sortZA = () => {
    const result = [...products].sort((a,b)=> b.name.localeCompare(a.name));
    setProducts(result);
  }

  const sortPriceAsc = () => {
    const result = [...products].sort((a,b)=> a.price - b.price);
    setProducts(result);
  }

  const sortPriceDesc = () => {
    const result = [...products].sort((a,b)=> b.price - a.price);
    setProducts(result);
  }

  const filterByCategory = (categoryClicked) => {
    // tagastab - returns
    if (categoryClicked === 'all') {
      setProducts(databaseProducts);
    } else {
      const result = databaseProducts.filter(element => element.category === categoryClicked);
      setProducts(result);
    }
    // const result = productsFromFile.filter(element => element.category === categoryClicked);
    // categoryClicked === 'all' ? setProducts(productsFromFile) : setProducts(result);
    setActiveCategory(categoryClicked);
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

  // ternary operator     true/false ? true-blokk : false-blokk
  return ( 
  <div>
    <div className={activeCategory === 'all' ? "category-active" : undefined} 
      onClick={() => filterByCategory('all')}>
        Kõik kategooriad
    </div>
    {categories.map(element => 
      <div key={element} className={activeCategory === element ? "category-active" : undefined} 
        onClick={() => filterByCategory(element)}>
          {element}
      </div>)}
    <Button onClick={sortAZ}>Sort A-Z</Button>
    <Button onClick={sortZA}>Sort Z-A</Button>
    <Button onClick={sortPriceAsc}>Hind kasvavalt</Button>
    <Button onClick={sortPriceDesc}>Hind kahanevalt</Button>
    <div>Tooteid on {products.length} tk</div>
    {products.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        <Button variant="success" onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}
  </div> );
}

export default HomePage;