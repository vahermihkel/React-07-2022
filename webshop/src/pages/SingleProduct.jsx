import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef
  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        const found = data.find(element => element.id === Number(id));
        setProduct(found);
      })
  }, [id]);

  return ( 
  <div>
      { product !== undefined && 
      <div>
        <img src={product.image} alt="" />
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.description}</div>
        <div>{product.category}</div>
      </div> }
      { product === undefined && <div>Toodet ei leitud!</div> }
  </div> );
}

export default SingleProduct;