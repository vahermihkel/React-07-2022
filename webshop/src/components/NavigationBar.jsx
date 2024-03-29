import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { cartSumService } from "../store/cartSumService";
// import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import CartSumContext from '../store/CartSumContext';


// R 26.08 - sisselogimine/registreerumine
// R 02.09 - 9.30 - Nortali proovitöö, saate rääkida mis projektid plaanis on
// T 13.09 - näitate lõpuprojekti veebilehte, koodi poolt (tehke ükskõik mida Reactis)

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  const cartSumCtx = useContext(CartSumContext);
  const navigate = useNavigate();

  // const getCartSum = () => {
  //   let cart = sessionStorage.getItem("cart");
  //   cart = JSON.parse(cart) || [];
  //   let cartSum = 0;
  //   cart.forEach(element => cartSum += element.product.price * element.quantity);
  //   return cartSum;
  // }
  // const [cartSum, setCartSum] = useState(getCartSum());

  const changeWebsiteLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

  // cartSumService.getCartSum().subscribe(newCartSum => setCartSum(newCartSum));

  const logout = () => {
    authCtx.logout(false);
    navigate("/");
  }

  return ( 
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          { authCtx.loggedIn === true && <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>}
          <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
          <Nav.Link as={Link} to="/meist">{t('navbar.about-button')}</Nav.Link>
          <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
          { authCtx.loggedIn === false && <Nav.Link as={Link} to="/logi-sisse">Logi sisse</Nav.Link>}
          { authCtx.loggedIn === true && <Nav.Link onClick={logout}>Logi välja</Nav.Link>}
        </Nav>
      </Container>
      <div className="cart-sum">{ cartSumCtx.cartSum } €</div>
      <img className="lang" onClick={() => changeWebsiteLanguage('ee')} src={require('../assets/estonian.png')} alt="" />
      <img className="lang" onClick={() => changeWebsiteLanguage('en')} src={require('../assets/english.png')} alt="" />
      <img className="lang" onClick={() => changeWebsiteLanguage('ru')} src={require('../assets/russian.png')} alt="" />
    </Navbar>
   );
}

export default NavigationBar;