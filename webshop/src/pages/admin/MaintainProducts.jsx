import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import productsFromFile from '../../products.json';

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);
  const searchedRef = useRef();

  const deleteProduct = (index) => {
    products.splice(index,1);
    setProducts(products.slice());
  }

  // kirjeldusest + id-st leidmine, samamoodi nagu nimest
  const searchProducts = () => {
    const result = productsFromFile.filter(element => 
      element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
    setProducts(result);
  }

  return ( 
  <div>
    <input type="text" onChange={searchProducts} ref={searchedRef} /> <span>{products.length}</span>
    {products.map((element, index) => 
      <div key={element.id}>
        <div>{element.id}</div>
        <div>{element.image}</div>
        <div>{element.name}</div>
        <div>{element.price}</div>
        <div>{element.description}</div>
        <div>{element.category}</div>
        <div>{element.active + 0}</div>
        <button onClick={() => deleteProduct(index)}>x</button>
        <Link to={`/admin/muuda/${element.id}`}>
        {/* <Link to={"/admin/muuda/" + element.id}> */}
          <button>Muuda</button>
        </Link>
      </div>)}
  </div> );
}

export default MaintainProducts;