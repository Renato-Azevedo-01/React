import {useLocation} from 'react-router-dom'
import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import styles from './Projetos.module.css'
import ProjectCard from '../layout/ProjectCard'
import {useState, useEffect} from 'react'   
import Loading from '../layout/Loading'

function Projetos() {
    const [projetos, setProjetos] = useState([])  
    const [removeLoading, setRemoveLoading] = useState(false)
    const location = useLocation()
    const [projectMessage , setProjectMessage ] = useState('')
    let message = ''
    if (location.state) {
        message = location.state.message
    }   

    useEffect(() => {
        setTimeout(() => {          //fictício ... só para mostrar a execução do loader 
            
            fetch('http://localhost:5000/projects' , {
                method: "GET",
                headers: { "Content-Type" : "application/json"}
            })
            .then((resp) => resp.json())
            .then((data) => {console.log(data)
                            setProjetos(data)
                            setRemoveLoading(true)} ) //Acabou de carregar, o removeLoading vira true e some da tela 
            .catch((err) => console.log(err))
        }, 300)
    }, [] )
   
    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}` , {
            method: 'DELETE' ,
            headers: {
                'Component-Type' : 'application/json'
            },
        }).then(resp => resp.json())
          .then(() => {
              setProjetos(projetos.filter((project) => project.id !== id ))
              setProjectMessage('Projeto removido com sucesso !')
        })
          .catch((err)=> console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className = {styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to= "/newproject" text="Criar Projeto"/>               
            </div>

            {message && <Message msg={message} type="success"/>}
            {projectMessage && <Message msg={projectMessage} type="success"/>}

            <Container customClass="start">
                {projetos.length > 0
                 && projetos.map((project) => (
                    <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name} 
                        key={project.id} 
                        handleRemove={removeProject}
                    />))}

                { !removeLoading && <Loading/>}
                { removeLoading && projetos.length === 0 && (
                    <p>Não há projetos cadastrados !</p>    
                )}
            </Container>
            
        </div>
    )   
}
export default Projetos