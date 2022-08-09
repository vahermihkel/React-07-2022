import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [databaseProducts, setDatabaseProducts] = useState([]); // andmebaasist võetud, aga mida ei muuda pärast seda kunagi
  const [products, setProducts] = useState([]);
  const searchedRef = useRef();
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // päring käivitub KOHESELT lehele tulles
  // KUI on useState funktsioon .then sees
  // SIIS pean panema useEffect ümber

  // 500ms
  // asünkroonne
  useEffect(() => {
    fetch(productsUrl) // päring interneti
      .then(res => res.json()) // res / response -> tähistab komplekti kogu päringust (staatuskood, aeg, sisu, kust)
      .then(data => {     // data  / json --->  sisu, mida saan sellest päringust
        setDatabaseProducts(data); // data abil panen useState funktsiooni kaudu muutujasse lehel olevad väärtused
        setProducts(data); // data abil panen useState funktsiooni kaudu muutujasse lehel olevad väärtused
      })
  }, []);

  // uef
  // useEffect(() => {
  // }, []);

  const deleteProduct = (productClicked) => {
    const index = databaseProducts.indexOf(productClicked);
    databaseProducts.splice(index,1);
    setProducts(databaseProducts.slice());
    // asendab kõik andmebaasitooted
    fetch(productsUrl, {
      method: "PUT", // meetodi tüüp - asendus
      body: JSON.stringify(databaseProducts), // asendamise sisu - andmed
      headers: {
        "Content-Type": "application/json" // mis liiki sinna andmed läbivad
      }
    });
    toast.error('Edukalt kustutatud!', {
      position: "bottom-right",
      theme: "dark"
      });
  }

  // kirjeldusest + id-st leidmine, samamoodi nagu nimest
  const searchProducts = () => {
    const result = databaseProducts.filter(element => 
      element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
    setProducts(result);
  }

  return ( 
  <div>
    <ToastContainer />
    <input type="text" onChange={searchProducts} ref={searchedRef} /> <span>{products.length}</span>
    {products.map(element => 
      <div key={element.id}>
        <div>{element.id}</div>
        <div>{element.image}</div>
        <div>{element.name}</div>
        <div>{element.price}</div>
        <div>{element.description}</div>
        <div>{element.category}</div>
        <div>{element.active + 0}</div>
        <button onClick={() => deleteProduct(element)}>x</button>
        <Link to={`/admin/muuda/${element.id}`}>
        {/* <Link to={"/admin/muuda/" + element.id}> */}
          <button>Muuda</button>
        </Link>
      </div>)}
  </div> );
}
// 10ms

export default MaintainProducts;