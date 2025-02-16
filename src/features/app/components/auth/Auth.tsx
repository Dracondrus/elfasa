import { useState } from "react";
import { NavLink } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import styles from "./Auth.module.scss"
import { Button } from "antd";

const Auth: React.FC = () => {

const [isLogin, setIsLogin] = useState(true);


  return (
    <div className={styles.container}>


{isLogin? <Login/> : <Register/>}
<br />
<Button type="primary" className={styles.btn} onClick={() => setIsLogin(prev => !prev)}>{isLogin ? "перейти  на регистрацию" : " перейти на логин"}</Button>

  <NavLink to={'/elfasa'}>Перейти на главную</NavLink><br />

    </div>
  );
};

export default Auth;
