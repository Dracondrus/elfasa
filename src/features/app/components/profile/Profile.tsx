import { useState } from "react";
import { useGetProfile } from "../../service/queries";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import IsError from "../IsError/IsError";
import IsLoading from "../loading/Loading";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
    const { data: profile, isError, isLoading } = useGetProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) return <IsLoading />;
    if (isError) return <IsError />;

    return (
        <div className={styles.container}>
            <h4>Ваш профиль</h4>
            <p><strong>Ваше имя:</strong> {profile?.userName}</p>
            <p><strong>Телефон:</strong> {profile?.phoneNumber || "Не указан"}</p>
            <p><strong>Адрес:</strong> {profile?.address || "Не указан"}</p>
<br />

            {/* Иконка для открытия модального окна */}
            <ExclamationCircleOutlined
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            />

            {/* Модальное окно */}
            <Modal
      
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)}>
                        Закрыть
                    </Button>,
                ]}
            >
                <p>Если хотите добавить номер или адрес, свяжитесь с нами в Telegram:</p>
                <a 
                    href="https://t.me/elfasa_tasa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: "18px", fontWeight: "bold", color: "#0088cc" }}
                >
                    @elfasa_tasa
                </a>
            </Modal>
        </div>
    );
};

export default Profile;
