import styles from './NewProject.module.css'
import Form from '../layout/Form.js'
function NewProject() {
    return(
        <div className= {styles.newProject_container}>            
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <Form/>            
        </div>
    )
}
export default NewProject