  // loogelised sulud - võtab tüki sellest klassist
  // ilma loogeliste sulgudeta võtab kõik
import { useEffect, useState } from "react";
import { Button, Pagination  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CarouselGallery from "../components/home/CarouselGallery";
import SortButtons from "../components/home/SortButtons";
import Spinner from "../components/Spinner";
//  kui on faililaiend .js või .jsx, siis ei pea seda lõppu kirjutama
// aga .css või .json pean

function HomePage() {
  const [databaseProducts, setDatabaseProducts] = useState([]); // andmebaasist võetud, aga mida ei muuda pärast seda kunagi
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // väljanäidatavad tooted, mida järjepidevalt muudan
  const [isLoading, setLoading] = useState(false);
  const categories = [...new Set(databaseProducts.map(element => element.category))]; // andmebaasitooteid
  const [activeCategory, setActiveCategory] = useState("all");

  const [activePage,setActivePage] = useState(1); // aktiivse lehe number, mida ta näitab sinisena
  // 480 toodet
  // 1,2......,24
  const pages = [];  // let eesliides võimaldab teist korda sellele muutujale väärtust anda
  for (let number = 0; number < filteredProducts.length; number++) {
    if (number % 20 === 0) { // jääk on 0, ehk jagades 20-ga on täisarv (pole komakohti)
      pages.push(number / 20 + 1); // 23
    } 
  }
  
  // .map( => UUS_VÄÄRTUS)     [{n:"1"}, {n:"2"}, {n:"3"}]   ---->   ["1","2","3"] asenduseks    .length sama
  // .sort( => Pluss või miinusmärk)    [{n:"1"},{n:"2"}, {n:"3"}]  ---> [{n:"3"}, {n:"2"}, {n:"1"}]   .length sama
  // .filter( => TRUE või FALSE )        [{n:"1"}, {n:"2"}, {n:"3"}]  -->   [{n:"2"}, {n:"3"}]   .length väheneb

  // aadress, mille andis Firebase / products.json
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // uef
  useEffect(() => {
    setLoading(true);
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        data = data.filter(element => element.active === true);
        setDatabaseProducts(data || []); // originaalsed kuidas tuleb andmebaasist (474)
        setFilteredProducts(data || []); // filtreerimise järgsed (kategooria järgi) (230/230/10/5/1)
        setProducts(data.slice(0,20) || []); // leheküljel korraga näidatavad (20-20-20-20-20-viimasel lehel vähem)
        setLoading(false);
      })
  }, []);

  const filterByCategory = (categoryClicked) => {
    // tagastab - returns
    if (categoryClicked === 'all') {
      setFilteredProducts(databaseProducts);
      setProducts(databaseProducts.slice(0,20));
    } else {
      const result = databaseProducts.filter(element => element.category === categoryClicked);
      setFilteredProducts(result);
      setProducts(result.slice(0,20));
      // midagi pean panema ka setProducts osas siia -> näitab mingit 20-t toodet
    }
    setActivePage(1);
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
    toast.success('Edukalt lisatud ostukorvi!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  const changeActivePage = (number) => {
    setActivePage(number);
    // 1-20       .slice(0,20)    1
    // 21-40      .slice(20,40)   2
    // 41-60      .slcie(40,60)   3
    setProducts(filteredProducts.slice(number*20-20,number*20));
    // kui panen järjekorda, aga vahetan lehte, siis paneb otsast peale
  }

  return ( 
  <div>
    <CarouselGallery />

    { isLoading && <Spinner />}
    <ToastContainer />
    <div className={activeCategory === 'all' ? "category-active" : undefined} 
      onClick={() => filterByCategory('all')}>
        Kõik kategooriad
    </div>
    {categories.map(element => 
      <div key={element} className={activeCategory === element ? "category-active" : undefined} 
        onClick={() => filterByCategory(element)}>
          {element}
      </div>)}
    
    <SortButtons categoryProducts={filteredProducts} updatePageProducts={setProducts} />

    <div>Tooteid on {filteredProducts.length} tk</div>
    {products.map(element => 
      <div key={element.id}>
        {/* <Link to={"/toode/" + element.id}> */}
        <Link to={`/toode/${element.id}`}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
        </Link>
        <Button variant="success" onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}
     { pages.length > 1 && 
      <Pagination>{pages.map(number => 
        <Pagination.Item key={number} active={number === activePage} onClick={()=>changeActivePage(number)}>
          {number}
        </Pagination.Item>)}
      </Pagination>}
  </div> );
}

export default HomePage;


// ME EI LASE ühtegi faili suuremaks kui 200 rida
// ideaalis hoiame kõik failid mitte suuremad kui 150 rida
// praegu proovime kõik failid hoida mitte suuremad kui 100 rida