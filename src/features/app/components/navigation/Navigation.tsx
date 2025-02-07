import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { USER } from "../../utils/constants/LocalStorageKeys";
import { LocalStorage } from "../../service/LocalStorage";
import { AdminPaths } from "../../../../routing/admin/adminPaths";
import { rootPaths } from "../../../../routing/root/rootPaths";

import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {

    const [isAdmin, setIsAdmin] = useState(
        LocalStorage.get(USER) === import.meta.env.VITE_ADMIN_KEY
    );  

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAdmin(LocalStorage.get(USER) === import.meta.env.VITE_ADMIN_KEY);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className={styles.navigation}>
            
            {isAdmin && (
                <div className={styles.admin__menu}>
                    <NavLink to="/elfasa/admin">E L F A S A</NavLink>
                    {Object.values(AdminPaths).map((path) => (
                    <NavLink key={path} to={`/elfasa/admin/${path}`}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                    </NavLink>
                ))}
                </div>
            )}
             <div className={styles.container__menu}>
                 <div className={styles.menu} >
                <NavLink to="/elfasa">Main</NavLink>
                {Object.values(rootPaths).map((path) => (
                    <NavLink key={path} to={`/elfasa/${path}`}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                    </NavLink>
                ))}
                 </div>
            </div>
        </div>
    );
};

export default Navigation;
