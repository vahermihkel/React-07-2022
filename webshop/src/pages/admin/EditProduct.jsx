import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import productsFromFile from '../../products.json';

function EditProduct() {
  const { id } = useParams();
  // const product = productsFromFile.find(element => Number(element.id) === Number(id));
  // const index2 = productsFromFile.indexOf(product);
  const index = productsFromFile.findIndex(element => Number(element.id) === Number(id));
  const product = productsFromFile[index];
  // võtke KÕIK useRef-d AddProductist
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();

  // võtke KÕIK inputid ja labelid AddProductist
  // pange kõigi inputide sisse defaultValue=""

  const updateProduct = () => {
    const newProduct = {
      "id":idRef.current.value,
      "image":imageRef.current.value,
      "name":nameRef.current.value,
      "price":priceRef.current.value,
      "description":descriptionRef.current.value,
      "category":categoryRef.current.value,
      "active":activeRef.current.checked
    }
    productsFromFile[index] = newProduct;
    //   0        1        2
    // ["ant", "bison", "camel"][1] = "bird";
    // ["ant", "bird", "camel"]
  }

  // proovige muutmist teha, vastavalt eesti keelsele projektile
  return ( 
  <div>
    <label>Toote ID</label> <br />
    <input ref={idRef} defaultValue={product.id} type="number" /> <br />
    <label>Toote nimi</label> <br />
    <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
    <label>Toote hind</label> <br />
    <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
    <label>Toote kirjeldus</label> <br />
    <input ref={descriptionRef} defaultValue={product.description} type="text" /> <br />
    <label>Toote kategooria</label> <br />
    <input ref={categoryRef} defaultValue={product.category} type="text" /> <br />
    <label>Toote pilt</label> <br />
    <input ref={imageRef} defaultValue={product.image} type="text" /> <br />
    <label>Toote aktiivsus</label> <br />
    <input ref={activeRef} defaultChecked={product.active} type="checkbox" /> <br />
    <button onClick={updateProduct}>Muuda</button>
  </div> );
}

export default EditProduct;





// useState
// useRef
// useParams
// useTranslate
// useNavigate
// useContext