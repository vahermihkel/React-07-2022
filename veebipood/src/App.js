import { Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
import LisaToode from './pages/LisaToode';
import MuudaToode from './pages/MuudaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      <button className="nupu-css">Nupp</button>
      

      <Routes>
        <Route path='' element={ <Avaleht /> } />
        <Route path='ostukorv' element={ <Ostukorv /> } />
        <Route path='lisa-toode' element={ <LisaToode /> } />
        <Route path='poed' element={ <Poed /> } />
        <Route path='toode/:nimi' element={ <YksikToode /> } />
        <Route path='muuda/:tooteNimi' element={ <MuudaToode /> } />
        <Route path='halda' element={ <HaldaTooteid /> } />
      </Routes>

    </div>
  );
}

export default App;
