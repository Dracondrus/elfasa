import { Table, Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { useGetWorkers } from "../../../app/service/queries";
import $api from "../../../app/utils/helpers/axiosInstance";
import { IWorkerModel } from "../../../app/utils/models/WorkerModel";
import styles from "./Workers.module.scss";

const WorkersTable: React.FC = () => {
  const { data: workers = [], refetch } = useGetWorkers();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newWorker, setNewWorker] = useState<IWorkerModel>({
    id: 0,
    workerName: "",
    uniqueKeyProduct: "",
    workerPhoneNumber: "",
    workerStatus: 0,
    workerJobName: "",
    smth: "",
  });
  const [editingWorker, setEditingWorker] = useState<IWorkerModel | null>(null);

  const addWorker = async () => {
    try {
      await $api.post("/api/workers", newWorker);
      message.success("Работник добавлен");
      setNewWorker({
        id: 0,
        workerName: "",
        uniqueKeyProduct: "",
        workerPhoneNumber: "",
        workerStatus: 0,
        workerJobName: "",
        smth: "",
      });
      setIsModalOpen(false);
      refetch();
    } catch {
      message.error("Ошибка при добавлении работника");
    }
  };

  const updateWorker = async () => {
    if (!editingWorker) return;
    try {
      await $api.put(`/api/workers/${editingWorker.id}`, editingWorker);
      message.success("Работник обновлён");
      setIsEditModalOpen(false);
      refetch();
    } catch {
      message.error("Ошибка при обновлении работника");
    }
  };

  const deleteWorker = async (id: number) => {
    try {
      await $api.delete(`/api/workers/${id}`);
      message.success("Работник удалён");
      refetch();
    } catch {
      message.error("Ошибка при удалении работника");
    }
  };

  const filteredWorkers = workers?.filter((worker) =>
    worker?.workerName?.toLowerCase()?.includes(search.toLowerCase()) ||
    worker?.workerPhoneNumber?.includes(search) ||
    worker?.uniqueKeyProduct?.toLowerCase()?.includes(search.toLowerCase())
  ) || [];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Имя работника", dataIndex: "workerName", key: "workerName" },
    { title: "Телефон", dataIndex: "workerPhoneNumber", key: "workerPhoneNumber" },
    { title: "Продукт", dataIndex: "uniqueKeyProduct", key: "uniqueKeyProduct" },
    { title: "Статус", dataIndex: "workerStatus", key: "workerStatus", render: (status: number) => (
      <span
        style={{
          color: status <= 20 ? 'red' :
                status <= 40 ? 'orange' :
                status <= 60 ? 'lightblue' :
                status <= 80 ? 'purple' : 'pink',
            fontWeight: 600
        }}
      >
        {status}
      </span>
    )},
    { title: "Работа", dataIndex: "workerJobName", key: "workerJobName" },
    { title: "Доп. информация", dataIndex: "smth", key: "smth" },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: IWorkerModel) => (
        <>
          <Button type="primary" onClick={() => { setEditingWorker(record); setIsEditModalOpen(true); }}>Редактировать</Button> &nbsp;
          <Button danger onClick={() => deleteWorker(record.id)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.inputBlock}>
        <Input
          className={styles.input}
          placeholder="Поиск по имени, телефону или продукту"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Добавить работника
        </Button>
      </div>
      <Table dataSource={filteredWorkers} columns={columns} loading={!workers.length} rowKey="id" />
      <Modal title="Добавить работника" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={addWorker}>
        <Input placeholder="Имя" value={newWorker.workerName} onChange={(e) => setNewWorker({ ...newWorker, workerName: e.target.value })} />
    
        <Input placeholder="Телефон" value={newWorker.workerPhoneNumber} onChange={(e) => setNewWorker({ ...newWorker, workerPhoneNumber: e.target.value })} />
        <Input placeholder="Статус" value={newWorker.workerStatus} onChange={(e) => setNewWorker({ ...newWorker, workerStatus: parseInt(e.target.value) })} />
        <Input placeholder="Работа" value={newWorker.workerJobName} onChange={(e) => setNewWorker({ ...newWorker, workerJobName: e.target.value })} />
    
      </Modal>

    
      <Modal className={styles.padding} title="Редактировать работника" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={updateWorker}>
        <Input placeholder="Имя" value={editingWorker?.workerName || ""} onChange={(e) => setEditingWorker({ ...editingWorker!, workerName: e.target.value })} />
        <Input placeholder="Продуктовый ключ" value={editingWorker?.uniqueKeyProduct || ""} onChange={(e) => setEditingWorker({ ...editingWorker!, uniqueKeyProduct: e.target.value })} />
        <Input placeholder="Телефон" value={editingWorker?.workerPhoneNumber || ""} onChange={(e) => setEditingWorker({ ...editingWorker!, workerPhoneNumber: e.target.value })} />
        <Input placeholder="Статус" value={editingWorker?.workerStatus || ""} onChange={(e) => setEditingWorker({ ...editingWorker!, workerStatus: parseInt(e.target.value) })} />
        <Input placeholder="Работа" value={editingWorker?.workerJobName || ""} onChange={(e) => setEditingWorker({ ...editingWorker!, workerJobName: e.target.value })} />
       
      </Modal>
    </div>
  );
};

export default WorkersTable;
