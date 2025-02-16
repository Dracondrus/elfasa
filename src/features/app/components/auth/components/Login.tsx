import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, message } from "antd"; // Ant Design

import { userReducerActions } from "../../../../../store/reducers/userReducer";
import { LocalStorage } from "../../../service/LocalStorage";
import { USER } from "../../../utils/constants/LocalStorageKeys";
import $api from "../../../utils/helpers/axiosInstance";



const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setUser, setIsAuth } = userReducerActions;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        if (!userName || !password) {
            message.warning("Введите логин и пароль!");
            return;
        }

        setLoading(true);

        try {
            const response = await $api.post("api/users/login", {
                userName,
                password,
            });

            if (response.status === 200) {
                message.success("Вход успешен!");

                dispatch(setUser(password));
                LocalStorage.set(USER, password);
                dispatch(setIsAuth(true));

                navigate("/elfasa");
            }
        } catch (error) {
            message.error("Неверный логин или пароль!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 300, margin: "auto", textAlign: "center" }}>
            <h2>Вход</h2>
            <Input 
                placeholder="Логин" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                style={{ marginBottom: 10 }} 
            />
            <Input.Password 
                placeholder="Пароль" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ marginBottom: 10 }} 
            />
            <Button 
                type="primary" 
                onClick={onLogin} 
                loading={loading} 
                block
            >
                Войти
            </Button>
        </div>
    );
};

export default Login;
