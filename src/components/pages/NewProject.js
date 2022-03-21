import {useNavigate} from 'react-router-dom'
import styles from './NewProject.module.css'
import Form from '../layout/Form.js'

function NewProject() {
   
    const navigate = useNavigate()   

    function createPost(project) {
        //Initialize costs and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects" , {
        method:'POST',    
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/projetos' , {message: 'Projeto criado com sucesso!'})
        } )
        .catch((err) => console.log(err))
    }

    return(
        <div className= {styles.newProject_container}>            
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <Form handleSubmit={createPost} btnText="Criar Projeto"/>            
        </div>
    )
}
export default NewProject