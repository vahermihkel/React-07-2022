// localStorage/sessionStorage - igaühe arvutis (ainult ostukorvi jaoks, keele jaoks)
// fail - lugemiseks
// andmebaas - T   MongoDb / Firebase andmebaas
import { useRef, useState } from "react";
import categoriesFromFile from "../../categories.json";

function Category() {
  const [categories, setCategories] = useState(categoriesFromFile);
  const categoryRef = useRef();
                                                              //                      !!!!!!!!!!!!!!!
  // const categoriesUrl = "https://react-0722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";


                // event - siia sisse lähevad kõik sündmusega seotud omadused
  const addCategory = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      categoriesFromFile.push({name: categoryRef.current.value}); // andmebaasi lisamise päring
      setCategories(categoriesFromFile.slice());
    }
  }

  const deleteCategory = (index) => {
    categoriesFromFile.splice(index,1);
    setCategories(categoriesFromFile.slice());
  }

  return ( 
    <div>
      <label>Kategooria</label>
      <input onKeyUp={addCategory} type="text" ref={categoryRef} />
      <button onClick={addCategory}>Lisa</button>
      {categories.map((element, index) => 
        <div key={element.name}>
            {element.name} 
            <button onClick={()=>deleteCategory(index)}>X</button>
        </div>)}
    </div> );
}

export default Category;