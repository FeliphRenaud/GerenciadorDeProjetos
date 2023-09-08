import styles from './Submit.module.css'

function Submit ({text}){
    return (
        <div>
            <button className={styles.submitBtn}>{text}</button>
        </div>
    )
}   
    
    export default Submit;