import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './pages/AboutUs';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import Cart from './pages/Cart';
import Category from './pages/admin/Category';
import EditProduct from './pages/admin/EditProduct';
import HomePage from './pages/HomePage';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import Shops from './pages/Shops';
import SingleProduct from './pages/SingleProduct';
import NavigationBar from './components/NavigationBar';
import NotFound from './pages/NotFound';
import PaymentCompleted from './pages/PaymentCompleted';

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
        <Route path="/tellimus" exact element={ <PaymentCompleted /> } />
        <Route path="/admin" exact element={ <AdminHome /> } />
        <Route path="/admin/lisa-toode" exact element={ <AddProduct /> } />
        <Route path="/admin/halda-tooteid" exact element={ <MaintainProducts /> } />
        <Route path="/admin/muuda/:id" exact element={ <EditProduct /> } />
        <Route path="/admin/halda-poode" exact element={ <MaintainShops /> } />
        <Route path="/admin/halda-kategooriaid" exact element={ <Category /> } />
        <Route path="*" exact element={ <NotFound /> } />
        {/* <Route path="*" exact element={ <Navigate to="/" /> } /> */}
      </Routes>
    </div>
  );
}

export default App;
