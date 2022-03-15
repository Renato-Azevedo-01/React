import styles from './NewProject.module.css'
import Form from '../layout/Form.js'
function NewProject() {
    return(
        <div>
            <div>
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços</p>
            </div>
            <div>
                <Form/>
            </div>
        </div>
    )
}
export default NewProject