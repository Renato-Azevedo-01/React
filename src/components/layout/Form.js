import styles from './Form.module.css'
import InputForm from './InputForm.js'
function Form() {
    return(
        <div>
        <form className={styles.formulario}>
            <InputForm nome="projeto1" type="text" project="Nome do Projeto" id="projeto1" placeholder="Insira o nome do Projeto"  />
        </form>
        </div>
    )
}
export default Form