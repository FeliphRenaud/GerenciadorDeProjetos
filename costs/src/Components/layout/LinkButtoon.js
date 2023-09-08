import styles from './LinkBotton.module.css'
import { Link } from 'react-router-dom'


function LinkBotton ({to, text}){
    return(
        <Link className={styles.btn} to={to}>
        {text}
        </Link>

    )
}

export default LinkBotton;