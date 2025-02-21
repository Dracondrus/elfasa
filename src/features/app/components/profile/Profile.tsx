import { useState } from "react";
import { Button, Input, message, Modal } from "antd";
import { useGetProfile } from "../../service/queries";
import { IUserModel } from "../../utils/models/UserModel";
import IsError from "../IsError/IsError";
import IsLoading from "../loading/Loading";
import $api from "../../utils/helpers/axiosInstance";
import styles from "./Profile.module.scss";


const PhoneNumberInput: React.FC<{ value?: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value.replace(/\D/g, ""); 
        if (inputVal.startsWith("998")) {
            inputVal = inputVal.slice(3); 
        }
        if (inputVal.length > 9) inputVal = inputVal.slice(0, 9); // Ограничение по длине

        const formatted = `+998 ${inputVal.slice(0, 2)} ${inputVal.slice(2, 5)} ${inputVal.slice(5, 7)} ${inputVal.slice(7, 9)}`.trim();
        onChange(formatted);
    };

    return (
        <Input
            value={value || "+998 "}
            onChange={handlePhoneChange}
            maxLength={17}
            placeholder="+998 XX XXX XX XX"
            style={{ marginBottom: 8, height: 32 }}
        />
    );
};

const Profile: React.FC = () => {
    const { data: profile, isError, isLoading, refetch } = useGetProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<IUserModel | null>(null);
    const [loading, setLoading] = useState(false);

    if (isLoading) return <IsLoading />;
    if (isError) return <IsError />;

    const startEditing = () => {
        if (!profile) return;
        setFormData(profile);
        setIsEditing(true);
    };

    const handleChange = (field: keyof IUserModel, value: string) => {
        if (formData) {
            setFormData({ ...formData, [field]: value });
        }
    };

    const saveChanges = async () => {
        if (!formData) return;
        setLoading(true);

        try {
            await $api.put(`api/users/${profile?.id}`, formData);
            message.success("Профиль обновлён!");
            setIsEditing(false);
            refetch();
        } catch {
            message.error("Ошибка при обновлении профиля!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h4>Ваш профиль</h4>
            <p>Ваше имя: {profile?.userName}</p>
            <p>Телефон: {profile?.phoneNumber || "Не указан"}</p>
            <p>Адрес: {profile?.address || "Не указан"}</p>
<br />
            <Button className={styles.btn} type="primary" onClick={startEditing} style={{ height: 32 }}>
                Изменить
            </Button>

            <Modal
                title="Редактирование профиля"
                open={isEditing}
                onCancel={() => setIsEditing(false)}
                onOk={saveChanges}
                confirmLoading={loading}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Input
                    value={formData?.userName}
                    onChange={(e) => handleChange("userName", e.target.value)}
                    style={{ marginBottom: 8, height: 32 }}
                    placeholder="Имя"
                />
                <PhoneNumberInput
                    value={formData?.phoneNumber}
                    onChange={(val) => handleChange("phoneNumber", val)}
                    
                />
                <Input
                    value={formData?.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    style={{ marginBottom: 8, height: 32 }}
                    placeholder="Адрес"
                />
            </Modal>
        </div>
    );
};

export default Profile;