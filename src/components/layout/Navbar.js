import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png';
import Container from './Container.js'  

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="Costs" /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projetos">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/empresa">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contato">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
        
        )
}
export default Navbar