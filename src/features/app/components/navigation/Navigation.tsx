import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { USER } from "../../utils/constants/LocalStorageKeys";
import { LocalStorage } from "../../service/LocalStorage";
import { AdminPaths } from "../../../../routing/admin/adminPaths";
import { rootPaths } from "../../../../routing/root/rootPaths";

import styles from "./Navigation.module.scss";

import Product from "../../assets/product.svg"
import Delivery from "../../assets/delivery.svg";
import Order from "../../assets/order.svg";
import Profile from "../../assets/profile.svg";

interface img {
    id: number,
    src: string
}

const Navigation: React.FC = () => {

    const imgs: img[] = [
        {id: 1 , src: Order},
        {id: 2 , src: Delivery},
        {id: 3 , src: Profile}
     
    ]
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
             <div className={styles.menu}>
             <NavLink 
    to="/elfasa" 
    end
    className={({ isActive }) => isActive ? styles.active : ""}
>
    <img src={Product} alt="" height="26" width="26" />
</NavLink>


    {Object.values(rootPaths).map((path, index) => (
        <NavLink 
            key={path} 
            to={`/elfasa/${path}`} 
            className={({ isActive }) => isActive ? styles.active : ""}
        >
            <img src={imgs[index % imgs.length].src} height="26" width="26" loading="lazy" />
        </NavLink>
    ))}
</div>

            </div>
        </div>
    );
};

export default Navigation;
