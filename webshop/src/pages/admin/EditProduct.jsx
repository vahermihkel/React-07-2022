import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
// import productsFromFile from '../../products.json';
import categoriesFromFile from '../../categories.json';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  // const product = productsFromFile.find(element => Number(element.id) === Number(id));
  // const index2 = productsFromFile.indexOf(product);
  const index = products.findIndex(element => Number(element.id) === Number(id));
  const product = products[index];
  // võtke KÕIK useRef-d AddProductist
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        // setDatabaseProducts(data);
        setProducts(data);
      })
  }, []);

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
    products[index] = newProduct;
    //   0        1        2
    // ["ant", "bison", "camel"][1] = "bird";
    // ["ant", "bird", "camel"]
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const checkIdUniqueness = () => {
    // KUI ON OLEMAS: 0,1,2,3,4,5,6,7,...,481     KUI EI OLE OLEMAS: -1
                                                        //   51947968      === "51947968"
    if (Number(product.id) === Number(idRef.current.value)) {
      setIdUnique(true);
    } else {
      const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
      if (index === -1) {
        // console.log("ID ON UNIKAALNE!");
        setIdUnique(true);
      } else {
        // console.log("ID ON KELLELGI OLEMAS!");
        setIdUnique(false);
      }
    }
  }

  return ( 
  <div>
    {product !== undefined && <div>
      { idUnique === false && <div>ID ei ole unikaalne!</div>}
      <label>Toote ID</label> <br />
      <input onChange={checkIdUniqueness} ref={idRef} defaultValue={product.id} type="number" /> <br />
      <label>Toote nimi</label> <br />
      <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
      <label>Toote kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={product.description} type="text" /> <br />
      <label>Toote kategooria</label> <br />
      {/* <input ref={categoryRef} defaultValue={product.category} type="text" /> <br /> */}
      <select ref={categoryRef} defaultValue={product.category}>
        {categoriesFromFile.map(element => <option>{element.name}</option>)}
      </select> <br />
      <label>Toote pilt</label> <br />
      <input ref={imageRef} defaultValue={product.image} type="text" /> <br />
      <label>Toote aktiivsus</label> <br />
      <input ref={activeRef} defaultChecked={product.active} type="checkbox" /> <br />
      <button disabled={idUnique===false} onClick={updateProduct}>Muuda</button>
    </div>}
  </div> );
}

export default EditProduct;





// useState
// useRef
// useParams
// useTranslate
// useNavigate
// useContext