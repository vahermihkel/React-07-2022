import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import productsFromFile from '../../products.json';
// import categoriesFromFile from '../../categories.json';


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

  const [categories, setCategories] = useState([]);
  const categoriesUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  const navigate = useNavigate();

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
      .then(data => {
        // setDatabaseProducts(data);
        setProducts(data || []);
      })

    fetch(categoriesUrl)
      .then(res => res.json())
      .then(data => setCategories(data || []))

    // fetch(categoriesUrl)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data !== null) { 
    //       setCategories(data);
    //     }
    //   }) 
  }, []);


  const [message, setMessage] = useState("");

  const addNewProduct = () => {

    // if (idRef.current.value === "" ||
    // nameRef.current.value === "" ||
    // priceRef.current.value === "" ||
    // descriptionRef.current.value === "" ||
    // imageRef.current.value === "") {
    //   setMessage("Nõutud väljad on täitmata!");
    //   return;
    // }

    if (idRef.current.value === "") {
      setMessage("Id on täitmata");
      return;
    }
    if (nameRef.current.value === "") {
      setMessage("Nimi on täitmata");
      return;
    }
    if (priceRef.current.value === "") {
      setMessage("Hind on täitmata");
      return;
    }
    if (descriptionRef.current.value === "") {
      setMessage("Kirjeldus on täitmata");
      return;
    }
    if (imageRef.current.value === "") {
      setMessage("Pilt on täitmata");
      return;
    }

    const newProduct = {
      "id":Number(idRef.current.value),
      "image":imageRef.current.value,
      "name":nameRef.current.value,
      "price":Number(priceRef.current.value),
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
    }).then(() => navigate("/admin/halda-tooteid"));
    // SUUNAME PÄRAST LISAMIST ÄRA
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
    <div>{message}</div>
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
      {categories.map(element => <option key={element.name}>{element.name}</option>)}
    </select> <br />
    <label>Toote pilt</label> <br />
    <input ref={imageRef} type="text" /> <br />
    <label>Toote aktiivsus</label> <br />
    <input ref={activeRef} type="checkbox" /> <br />
    {/* <Link to="/admin/halda-tooteid"> */}
    <button disabled={idUnique===false} onClick={addNewProduct}>Sisesta</button>
    {/* </Link> */}
  </div> );
}

export default AddProduct;

// Nortali proovitöö
// Iseseisev projekt lõpus
//     1) Webshop edasiarendus
//     2) Youtube/Udemy - õpetus
//     3) Mõni enda mõte