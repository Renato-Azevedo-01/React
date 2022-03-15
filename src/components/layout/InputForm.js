import styles from './InputForm.module.css'
function InputForm({nome,type,project,id,placeholder}){
    return(
        <div>
        <div className={styles.labelClass}>
            <label htmlFor={nome}>{project}</label> 
        </div>     
        <div>  
            <input type={type} id={id} name={nome} placeholder={placeholder}></input>   
        </div>
        </div>
    )
}

export default InputForm