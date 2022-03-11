import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Home from './components/pages/Home.js';
import Projetos from './components/pages/Projetos.js';
import Empresa from './components/pages/Empresa.js';
import Contato from './components/pages/Contato.js';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/projetos" element= {<Projetos/>} />
          <Route path="/empresa" element= {<Empresa/>} />
          <Route path="/contato" element= {<Contato/>} />
        </Routes>
      </Router>
    
  )
}

export default App;
