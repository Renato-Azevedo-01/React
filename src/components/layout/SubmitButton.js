import styles from './SubmitButton.module.css'

function Submit({text}) {
    return(
            <div>
                <button className={styles.btn}>{text}</button>
            </div>
        
    
    )

}

export default SubmitButton
