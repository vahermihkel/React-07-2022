import { useEffect, useRef, useState } from "react";
// import productsFromFile from '../../products.json';
import categoriesFromFile from '../../categories.json';

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const [products, setProducts] = useState([]);
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        // setDatabaseProducts(data);
        setProducts(data);
      })
  }, []);

  const addNewProduct = () => {
    const newProduct = {
      "id":idRef.current.value,
      "image":imageRef.current.value,
      "name":nameRef.current.value,
      "price":priceRef.current.value,
      "description":descriptionRef.current.value,
      "category":categoryRef.current.value,
      "active":activeRef.current.checked
    }
    products.push(newProduct);
    // LISA ANDMEBAASI
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
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index === -1) {
      // console.log("ID ON UNIKAALNE!");
      setIdUnique(true);
    } else {
      // console.log("ID ON KELLELGI OLEMAS!");
      setIdUnique(false);
    }
  }

  return ( 
  <div>
    { idUnique === false && <div>ID ei ole unikaalne!</div>}
    <label>Toote ID</label> <br />
    <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
    <label>Toote nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Toote hind</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Toote kirjeldus</label> <br />
    <input ref={descriptionRef} type="text" /> <br />
    <label>Toote kategooria</label> <br />
    {/* <input ref={categoryRef} type="text" /> <br /> */}
    <select ref={categoryRef}>
      {categoriesFromFile.map(element => <option>{element.name}</option>)}
    </select> <br />
    <label>Toote pilt</label> <br />
    <input ref={imageRef} type="text" /> <br />
    <label>Toote aktiivsus</label> <br />
    <input ref={activeRef} type="checkbox" /> <br />
    <button disabled={idUnique===false} onClick={addNewProduct}>Sisesta</button>
  </div> );
}

export default AddProduct;