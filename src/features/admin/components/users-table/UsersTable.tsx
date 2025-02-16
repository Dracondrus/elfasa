import { Table, Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { useGetUsers } from "../../../app/service/queries";
import $api from "../../../app/utils/helpers/axiosInstance";
import styles from "./Users.module.scss";
import { IUserModel } from "../../../app/utils/models/UserModel";

const UsersTable: React.FC = () => {
  const { data: users = [], refetch } = useGetUsers();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<IUserModel>({
    id: 0,
    uniqueKey: "",
    uniqueKeyProduct: "",
    userName: "",
    password: "",
    phoneNumber: "",
    address: "",
    something: "",
  });
  const [editingUser, setEditingUser] = useState<IUserModel | null>(null);

  const addUser = async () => {
    try {
      await $api.post("/api/users", newUser);
      message.success("Пользователь добавлен");
      setNewUser({
        id: 0,
        uniqueKey: "",
        uniqueKeyProduct: "",
        userName: "",
        password: "",
        phoneNumber: "",
        address: "",
        something: "",
      });
      setIsModalOpen(false);
      refetch();
    } catch {
      message.error("Ошибка при добавлении пользователя");
    }
  };

  const updateUser = async () => {
    if (!editingUser) return;
    try {
      await $api.put(`/api/users/${editingUser.id}`, editingUser);
      message.success("Пользователь обновлён");
      setIsEditModalOpen(false);
      refetch();
    } catch {
      message.error("Ошибка при обновлении пользователя");
    }
  };

  const deleteUser = async (uniqueKey: string) => {
    console.log(uniqueKey)
    try {
      await $api.delete(`/api/users/${uniqueKey}`);
      message.success("Пользователь удалён");
      refetch();
    } catch {
      message.error("Ошибка при удалении пользователя");
    }
  };

  const filteredUsers = users?.filter((user) => 
    user?.userName?.toLowerCase()?.includes(search.toLowerCase())
  ) || [];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Уникальный ключ", dataIndex: "uniqueKey", key: "uniqueKey" },
    { title: "Продуктовый ключ", dataIndex: "uniqueKeyProduct", key: "uniqueKeyProduct" },
    { title: "Имя", dataIndex: "userName", key: "userName" },
    { title: "Пароль", dataIndex: "password", key: "password" },
    { title: "Телефон", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Адрес", dataIndex: "address", key: "address" },
    { title: "Дополнительно", dataIndex: "something", key: "something" },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: IUserModel) => (
        <>
          <Button type="primary" onClick={() => { setEditingUser(record); setIsEditModalOpen(true); }}>Редактировать</Button> &nbsp;
          <Button danger onClick={() => deleteUser(record.uniqueKey)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.inputBlock}>
        <Input
        className={styles.input}
          placeholder="Поиск по имени"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Добавить пользователя
        </Button>
      </div>
      <Table dataSource={filteredUsers} columns={columns} loading={!users.length} rowKey="id" />

      <Modal title="Добавить пользователя" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={addUser}>
        <Input placeholder="Имя" value={newUser.userName} onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })} />
        <Input placeholder="Уникальный ключ" value={newUser.uniqueKey} onChange={(e) => setNewUser({ ...newUser, uniqueKey: e.target.value })} />
        <Input placeholder="Продуктовый ключ" value={newUser.uniqueKeyProduct} onChange={(e) => setNewUser({ ...newUser, uniqueKeyProduct: e.target.value })} />
        <Input placeholder="Пароль" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <Input placeholder="Телефон" value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
        <Input placeholder="Адрес" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
        <Input placeholder="Дополнительно" value={newUser.something} onChange={(e) => setNewUser({ ...newUser, something: e.target.value })} />
      </Modal>

      <Modal title="Редактировать пользователя" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={updateUser}>
  <Input placeholder="Имя" value={editingUser?.userName || ""} onChange={(e) => setEditingUser({ ...editingUser!, userName: e.target.value })} />
  <Input placeholder="Уникальный ключ" value={editingUser?.uniqueKey || ""} onChange={(e) => setEditingUser({ ...editingUser!, uniqueKey: e.target.value })} />
  <Input placeholder="Продуктовый ключ" value={editingUser?.uniqueKeyProduct || ""} onChange={(e) => setEditingUser({ ...editingUser!, uniqueKeyProduct: e.target.value })} />
  <Input.Password placeholder="Пароль" value={editingUser?.password || ""} onChange={(e) => setEditingUser({ ...editingUser!, password: e.target.value })} />
  <Input placeholder="Телефон" value={editingUser?.phoneNumber || ""} onChange={(e) => setEditingUser({ ...editingUser!, phoneNumber: e.target.value })} />
  <Input placeholder="Адрес" value={editingUser?.address || ""} onChange={(e) => setEditingUser({ ...editingUser!, address: e.target.value })} />
  <Input placeholder="Дополнительно" value={editingUser?.something || ""} onChange={(e) => setEditingUser({ ...editingUser!, something: e.target.value })} />
</Modal>


    </div>
  );
};

export default UsersTable;