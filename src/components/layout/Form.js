import {useState, useEffect} from 'react'
import styles from './Form.module.css'
import InputForm from './InputForm.js'
import Select from './Select.js'
import SubmitButton from './SubmitButton.js'

function Form({handleSubmit, btnText , projectData}) {
    
    const [categories, setCategories] = useState([])
    const [project , setProject] = useState(projectData || [])

   useEffect(()=>{fetch("http://localhost:5000/categories", 
                          {
                           method: "GET",
                           headers: {'Content-Type': 'application/json'}
                          }
                        )  
                    .then((resp) => resp.json())
                    .then((data) => {setCategories(data)})
                    .catch((err)=> console.log(err))
                 },
            [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})        
    }

    function handleCategory(e) {
        setProject({
            ...project, 
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })        
    }
   
    return(
        <div>
            <form onSubmit={submit} className={styles.formulario}>
                <InputForm 
                    type="text" 
                    text="Nome do projeto" 
                    name="name"  
                    placeholder="Insira o nome do Projeto"
                    handleOnChange={handleChange}
                    value={project.name ? project.name : ""}
                />
                <InputForm 
                    type="number" 
                    text="Orçamento do projeto" 
                    name="budget"  
                    placeholder="Insira o orçamento total"
                    handleOnChange={handleChange}
                    value={project.budget ? project.budget : ""}
                />
                <Select 
                    name="category_id" 
                    text="Selecione a categoria" 
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />

                <SubmitButton text={btnText}/>
            </form>
        </div>
    )
}
export default Form