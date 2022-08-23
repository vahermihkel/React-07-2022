import { useState } from "react";

function CategoryFilter(props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [...new Set(props.databaseProducts.map(element => element.category))]; // andmebaasitooteid

  const filterByCategory = (categoryClicked) => {
    // tagastab - returns
    if (categoryClicked === 'all') {
      props.setFilteredProducts(props.databaseProducts);
      props.setProducts(props.databaseProducts.slice(0,20));
    } else {
      const result = props.databaseProducts.filter(element => element.category === categoryClicked);
      props.setFilteredProducts(result);
      props.setProducts(result.slice(0,20));
      // midagi pean panema ka setProducts osas siia -> näitab mingit 20-t toodet
    }
    props.setActivePage(1);
    // const result = productsFromFile.filter(element => element.category === categoryClicked);
    // categoryClicked === 'all' ? setProducts(productsFromFile) : setProducts(result);
    setActiveCategory(categoryClicked);
  }

  return ( 
  <div>
    <div className={activeCategory === 'all' ? "category-active" : undefined} 
      onClick={() => filterByCategory('all')}>
        Kõik kategooriad
    </div>
    {categories.map(element => 
      <div key={element} className={activeCategory === element ? "category-active" : undefined} 
        onClick={() => filterByCategory(element)}>
          {element}
      </div>)}
  </div> );
}

export default CategoryFilter;