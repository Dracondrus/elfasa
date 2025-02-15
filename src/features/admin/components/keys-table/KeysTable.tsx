import { Table, Button, Input, message, Modal } from "antd";
import styles from "./Keys.module.scss";
import $api from "../../../app/utils/helpers/axiosInstance";
import { useGetKeys } from "../../../app/service/queries";
import { useState } from "react";

interface KeyModel {
  id: number;
  name: string;
}

const KeysTable: React.FC = () => {
  const { data: keys, refetch } = useGetKeys();
  const [newKey, setNewKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const addKey = async () => {
    if (!newKey.trim()) return;
    try {
      await $api.post("/api/keys", newKey);
      message.success("Ключ добавлен");
      setNewKey("");
      refetch();
      setIsModalOpen(false);
    } catch {
      message.error("Ошибка при добавлении ключа");
    }
  };

  const deleteKey = async (name: string) => {
    try {
      await $api.delete(`/api/keys/${name}`);
      message.success("Ключ удалён");
      refetch();
    } catch {
      message.error("Ошибка при удалении ключа");
    }
  };

  const filteredKeys = keys?.filter((key) => key.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Название", dataIndex: "name", key: "name" },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: KeyModel) => (
        <Button danger onClick={() => deleteKey(record.name)}>
          Удалить
        </Button>
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
          Добавить ключ
        </Button>
     
      </div>
      <Table dataSource={filteredKeys} columns={columns} loading={!keys} rowKey="id" />

      <Modal title="Добавить ключ" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={addKey}>
        <Input
          placeholder="Введите название ключа"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default KeysTable;