import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, message } from "antd"; // Ant Design

import { userReducerActions } from "../../../../../store/reducers/userReducer";
import { LocalStorage } from "../../../service/LocalStorage";
import { USER } from "../../../utils/constants/LocalStorageKeys";
import $api from "../../../utils/helpers/axiosInstance";


const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setUser, setIsAuth } = userReducerActions;

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [uniqueKey, setUniqueKey] = useState("");
    const [loading, setLoading] = useState(false);

    const onRegister = async () => {
        if (!userName || !password || !uniqueKey) {
            message.warning("Заполните все поля!");
            return;
        }
        if (password.length < 6) {
            message.warning("Пароль должен содержать минимум 6 символов!");
            return;
        }

        setLoading(true);

        try {
            const response = await $api.post("api/users", {
                userName,
                password,
                uniqueKey,
            });

            if (response.status === 200) {
                message.success("Регистрация успешна!");

                dispatch(setUser(password));
                LocalStorage.set(USER, password);
                dispatch(setIsAuth(true));

                navigate("/elfasa");
            }
        } catch {
            message.error("Ошибка регистрации!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 300, margin: "auto", textAlign: "center" }}>
            <h2>Регистрация</h2>
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
            <Input 
                placeholder="Уникальный ключ" 
                value={uniqueKey} 
                onChange={(e) => setUniqueKey(e.target.value)} 
                style={{ marginBottom: 10 }} 
            />
            <Button 
                type="primary" 
                onClick={onRegister} 
                loading={loading} 
                block
            >
                Зарегистрироваться
            </Button>
        </div>
    );
};

export default Register;
