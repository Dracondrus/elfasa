import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { LocalStorage } from "../../service/LocalStorage";
import { USER } from "../../utils/constants/LocalStorageKeys";
import { userReducerActions } from "../../../../store/reducers/userReducer";
import Login from "./components/Login";
import Register from "./components/Register";


// import style from "./Auth.module.scss"

const Auth: React.FC = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const { setUser ,setIsAuth} = userReducerActions;
const [isLogin, setIsLogin] = useState(false);
const onLogin = () => {
    dispatch(setUser("user"));
    LocalStorage.set(USER, "madenrea");
    dispatch(setIsAuth(true));

  navigate("/elfasa");

};

  return (
    <div>

  <button onClick={onLogin}>Login</button>
  <br />
<button onClick={() => setIsLogin(prev => !prev)}>{isLogin ? "перейти на регистрация перейти на логин" : " перейти на логин"}</button>
  <br />
  <NavLink to={'/elfasa'}>Перейти на главную</NavLink><br />
  {isLogin? <Login/> : <Register/>}
    </div>
  );
};

export default Auth;
