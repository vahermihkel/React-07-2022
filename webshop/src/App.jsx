import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './pages/AboutUs';
import AdminHome from './pages/admin/AdminHome';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import Shops from './pages/Shops';
import SingleProduct from './pages/SingleProduct';
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div>
      <NavigationBar />
      <Routes>
        {/* 11tk - 6 admin asja */}
        <Route path="/" exact element={ <HomePage /> } />
        <Route path="/poed" exact element={ <Shops /> } />
        <Route path="/meist" exact element={ <AboutUs /> } />
        <Route path="/ostukorv" exact element={ <Cart /> } />
        <Route path="/toode/:id" exact element={ <SingleProduct /> } />
        <Route path="/admin" exact element={ <AdminHome /> } />
        <Route path="/admin/lisa-toode" exact element={ <div>Lisa toote leht</div> } />
        <Route path="/admin/halda-tooteid" exact element={ <div>Halda toodete leht</div> } />
        <Route path="/admin/muuda/:id" exact element={ <div>Muuda toote leht</div> } />
        <Route path="/admin/halda-poode" exact element={ <div>Halda poode leht</div> } />
        <Route path="/admin/halda-kategooriaid" exact element={ <div>Halda poode leht</div> } />
      </Routes>
    </div>
  );
}

export default App;
