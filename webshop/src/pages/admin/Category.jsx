// localStorage/sessionStorage - igaühe arvutis (ainult ostukorvi jaoks, keele jaoks)
// fail - lugemiseks
// andmebaas - T   MongoDb / Firebase andmebaas
import { useEffect, useRef, useState } from "react"; // <---- useEffect import
// import categoriesFromFile from "../../categories.json"; // <---- kommenteerin välja
import Spinner from "../../components/Spinner";

function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const categoryRef = useRef();
  const categoriesUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  useEffect(() => {
    setLoading(true);
    fetch(categoriesUrl)
      .then(res => res.json())
      .then(data => {
        setCategories(data || []);
        setLoading(false);
    //    null         [{name:"dasdas"},....]
        // if (data !== null) { // kui on data null, siis if-i ei sisene
        //   setCategories(data); // seda osa teeb kui data on [{name:"dasdas"},....]
        // } // else {
        //   setCategories([]);
        // }
      }) // loogelised sulud on vabatahtlikud - panen/ei pane, kui on ÜKS rida
                                  // loogelised sulud on kohustuslikud - pean panema, kui on vähemalt KAKS rida
  }, []);

  //    [].map(element => ) <--- kui on üks argument, siis on vabatahtlik - panen/ei pane tavalised sulud
  //    [].map((element,index) => ) <--- kui on kaks argumenti, siis on kohustuslik - pean panema tavalised sulud

                // event - siia sisse lähevad kõik sündmusega seotud omadused
  const addCategory = (e) => {
    // console.log(e);
    if (e.key === "Enter" || e.type === "click") {
      categories.push({name: categoryRef.current.value}); // andmebaasi lisamise päring
      setCategories(categories.slice());
      fetch(categoriesUrl,{
        method: "PUT",
        body: JSON.stringify(categories),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  const deleteCategory = (index) => {
    categories.splice(index,1);
    setCategories(categories.slice());
    fetch(categoriesUrl,{
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  return ( 
    <div>
      <label>Kategooria</label>
      <input onKeyUp={addCategory} type="text" ref={categoryRef} />
      <button onClick={addCategory}>Lisa</button>
      {/* { categories.length === 0 &&
       <div>
        <br /> <br />
        <Spinner />
      </div>} */}
      <br />
     { isLoading && <Spinner />}
      {categories.map((element, index) => 
        <div key={element.name}>
            {element.name} 
            <button onClick={()=>deleteCategory(index)}>X</button>
        </div>)}
    </div> );
}

export default Category;