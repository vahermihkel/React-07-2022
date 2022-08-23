  // loogelised sulud - võtab tüki sellest klassist
  // ilma loogeliste sulgudeta võtab kõik
import { useEffect, useState } from "react";
import { Pagination  } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import CarouselGallery from "../components/home/CarouselGallery";
import CategoryFilter from "../components/home/CategoryFilter";
import Product from "../components/home/Product";
import SortButtons from "../components/home/SortButtons";
import Spinner from "../components/Spinner";
//  kui on faililaiend .js või .jsx, siis ei pea seda lõppu kirjutama
// aga .css või .json pean

function HomePage() {
  const [databaseProducts, setDatabaseProducts] = useState([]); // andmebaasist võetud, aga mida ei muuda pärast seda kunagi
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // väljanäidatavad tooted, mida järjepidevalt muudan
  const [isLoading, setLoading] = useState(false);

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

        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        data = data.map(element => {
          const index = cart.findIndex(cartProduct => cartProduct.product.id === element.id);
          
          let count = 0;
          if (index >= 0) {
            count = cart[index].quantity;
          }

          return {
            ...element,
            count
          }
        })

        setDatabaseProducts(data || []); // originaalsed kuidas tuleb andmebaasist (474)
        setFilteredProducts(data || []); // filtreerimise järgsed (kategooria järgi) (230/230/10/5/1)
        setProducts(data.slice(0,20) || []); // leheküljel korraga näidatavad (20-20-20-20-20-viimasel lehel vähem)
        setLoading(false);
      })
  }, []);

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
    <ToastContainer />
    <CarouselGallery />
    { isLoading && <Spinner />}
   
    <CategoryFilter
      databaseProducts={databaseProducts}
      setFilteredProducts={setFilteredProducts}
      setProducts={setProducts}
      setActivePage={setActivePage}
    />
    
    <SortButtons 
      categoryProducts={filteredProducts} 
      updatePageProducts={setProducts}
      updatePage={setActivePage} />

    <div>Tooteid on {filteredProducts.length} tk</div>
    {products.map(element => 
        <Product 
          key={element.id} 
          element={element}
          products={products}
          setProducts={setProducts} />
      )}

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