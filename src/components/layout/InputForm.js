import styles from './InputForm.module.css'
function InputForm({type, text, name, placeholder, handleOnChange, value}){
    return(
        <div>
            <div className={styles.form_control}>
                <label htmlFor={name}>{text}</label> 
                <input 
                    type={type} name={name} 
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                />   
            </div>
        </div>
    )
}

export default InputForm