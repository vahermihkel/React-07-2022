import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const index = products.findIndex(element => Number(element.id) === Number(id));
  const product = products[index];
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const productsUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [categories, setCategories] = useState([]);
  const categoriesUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => setProducts(data || []))

    fetch(categoriesUrl)
      .then(res => res.json())
      .then(data => setCategories(data || []))
  }, []);

  const updateProduct = () => {
    const newProduct = {
      "id":Number(idRef.current.value),
      "image":imageRef.current.value,
      "name":nameRef.current.value,
      "price":Number(priceRef.current.value),
      "description":descriptionRef.current.value,
      "category":categoryRef.current.value,
      "active":activeRef.current.checked
    }
    products[index] = newProduct;
    fetch(productsUrl, {
      method: "PUT",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => navigate("/admin/halda-tooteid"));
  }

  const checkIdUniqueness = () => {
    if (Number(product.id) === Number(idRef.current.value)) {
      setIdUnique(true);
    } else {
      const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
      if (index === -1) {
        setIdUnique(true);
      } else {
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
      <select ref={categoryRef} defaultValue={product.category}>
        {categories.map(element => <option key={element.name}>{element.name}</option>)}
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