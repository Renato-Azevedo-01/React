import savings from '../../img/savings.svg'
import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton.js'
function Home() {
    return(
        <section class={styles.home_container}>     
            <h1>Bem-vindo ao <span>Costs</span></h1> 
            <p>Comece a gerenciar os seus projetos agora mesmo</p>
            <LinkButton className={styles.btn} to= "/newproject" text="Criar Projeto"/>
            
            <img src={savings} alt="Costs" />
           
        </section>  
    )
}
export default Home