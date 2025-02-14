import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>404</div>
            <p className={styles.subtext}>Страница не найдена</p>
            <Link to="/elfasa" className={styles.link}> Перейти на главную</Link>
        </div>
    );
};

export default NotFound;
