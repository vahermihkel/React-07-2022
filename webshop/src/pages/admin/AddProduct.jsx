import { useRef } from "react";
import productsFromFile from '../../products.json';
import categoriesFromFile from '../../categories.json';

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();

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
    productsFromFile.push(newProduct);
  }

  return ( 
  <div>
    <label>Toote ID</label> <br />
    <input ref={idRef} type="number" /> <br />
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
    <button onClick={addNewProduct}>Sisesta</button>
  </div> );
}

export default AddProduct;