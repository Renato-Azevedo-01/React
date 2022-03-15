import styles from './Form.module.css'
import InputForm from './InputForm.js'
import Select from './Select.js'
import SubmitButton from './SubmitButton.js'
function Form() {
    return(
        <div>
        <form className={styles.formulario}>
            <InputForm 
                type="text" 
                text="Nome do projeto" 
                name="name"  
                placeholder="Insira o nome do Projeto"
            />
             <InputForm 
                type="number" 
                text="Orçamento do projeto" 
                name="budget"  
                placeholder="Insira o orçamento total"
            />
            <Select name="category_id" text="Selecione a categoria" />
            <SubmitButton text="Criar projeto"/>

        </form>
        </div>
    )
}
export default Form