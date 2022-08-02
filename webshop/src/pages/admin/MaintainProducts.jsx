import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import productsFromFile from '../../products.json';

function MaintainProducts() {
  const [databaseProducts, setDatabaseProducts] = useState([]); // andmebaasist võetud, aga mida ei muuda pärast seda kunagi
  const [products, setProducts] = useState([]);
  const searchedRef = useRef();
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        setDatabaseProducts(data);
        setProducts(data);
      })
  }, []);

  const deleteProduct = (productClicked) => {
    const index = databaseProducts.indexOf(productClicked);
    databaseProducts.splice(index,1);
    setProducts(databaseProducts.slice());
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(databaseProducts),
      headers: {
        "Content-Type": "application/json"
      }
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

export default MaintainProducts;