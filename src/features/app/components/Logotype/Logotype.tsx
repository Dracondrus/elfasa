
import styles from "./Logotype.module.scss"

import ELFASA from "../../assets/ELFASA.jpg"
import { NavLink } from "react-router-dom"

const Logotype :React.FC = () => {



    return (
        <div className="container__menu">
            <div className={styles.container}>
            <img src={ELFASA} alt="elfasa" height="40" width="40" loading="lazy" />
            <div className="Logotype__name"><NavLink to="/elfasa">ELFASA</NavLink></div>
            </div>
        </div>  
    )
}

export default Logotype