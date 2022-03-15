import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Home from './components/pages/Home.js';
import Projetos from './components/pages/Projetos.js';
import Novo_Projeto from './components/pages/NewProject.js';
import Empresa from './components/pages/Empresa.js';
import Contato from './components/pages/Contato.js';
import Container from './components/layout/Container.js';

function App() {
  return (    
    <Router>
        <Navbar/>  
        <Container customClass="min_height">
        <Routes>          
          <Route path="/" element= {<Home/>} />
          <Route path="/projetos" element= {<Projetos/>} />
          <Route path="/newproject" element= {<Novo_Projeto/>} />
          <Route path="/empresa" element= {<Empresa/>} />
          <Route path="/contato" element= {<Contato/>} />          
        </Routes>
        </Container>
        <Footer />
      </Router>
    
  )
}

export default App;
