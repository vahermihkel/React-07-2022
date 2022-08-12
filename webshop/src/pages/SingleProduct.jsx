import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef
  useEffect(() => {
    setLoading(true);
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        const found = (data || []).find(element => element.id === Number(id));
        setProduct(found);
        setLoading(false);
      })
  }, [id]);

  return ( 
  <div>
     { isLoading && <Spinner />}
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