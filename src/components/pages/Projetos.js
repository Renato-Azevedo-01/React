import {useLocation} from 'react-router-dom'
import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import styles from './Projetos.module.css'
import ProjectCard from '../layout/ProjectCard'
import {useState, useEffect} from 'react'   
import Loading from '../layout/Loading'
import {useNavigate} from 'react-router-dom'


function Projetos() {
    const [projects, setProjects] = useState([])  
    const [removeLoading, setRemoveLoading] = useState(false)
    const location = useLocation()
    
    let message = ''
    if (location.state) {
        message = location.state.message
    }   

    useEffect(() => {
        setTimeout(() => {
            
            fetch('http://localhost:5000/projects' , {
                method: "GET",
                headers: { "Content-Type" : "application/json"}
            })
            .then((resp) => resp.json())
            .then((data) => {console.log(data)
                            setProjects(data)
                            setRemoveLoading(true)} ) //Acabou de carregar, o removeLoading vira true e some da tela 
            .catch((err) => console.log(err))
        }, 300)
    }, [] )
   


    return(
        <div className={styles.project_container}>
            <div className = {styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to= "/newproject" text="Criar Projeto"/>               
            </div>

            {message && <Message msg={message} type="success"/>}

            <Container customClass="start">
                {projects.length > 0
                 && projects.map((project) => (
                    <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name} 
                        key={project.id} 
                    />))}

                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (                    
                    navigate('/projetos', { state: {message: 'Não há projetos cadastrados !'} })
                    
                )}
            </Container>
            
        </div>
    )   
}
export default Projetos