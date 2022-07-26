import { useState } from 'react';
import productsFromFile from '../../products.json';

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);

  return ( 
  <div>
    <input type="text" />
    {products.map(element => 
      <div key={element.id}>
        <div>{element.id}</div>
        <div>{element.image}</div>
        <div>{element.name}</div>
        <div>{element.price}</div>
        <div>{element.description}</div>
        <div>{element.category}</div>
        <div>{element.active + 0}</div>
        <button>x</button>
        <button>Muuda</button>
      </div>)}
  </div> );
}

export default MaintainProducts;