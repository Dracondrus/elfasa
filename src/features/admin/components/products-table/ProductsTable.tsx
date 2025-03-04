import { Table, Button, Upload, Input, Form, Modal, message, Select } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import $api from "../../../app/utils/helpers/axiosInstance";
import { IProduct } from "../../../app/utils/models/ProductModel";
import { useGetProducts } from "../../../app/service/queries";
import styles from "./ProductsTable.module.scss";

const ProductsTable: React.FC = () => {
  const { data: products, isLoading } = useGetProducts();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [file, setFile] = useState<RcFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("ProductName", values.productName);
    formData.append("ProductCategory", values.productCategory);
    formData.append("ProductPrice", values.productPrice.toString());
    formData.append("ProductPriceExp", values.productPriceExp.toString());
    formData.append("ProductAmount", values.productAmount.toString()); // Добавлено
    formData.append("ProductType", values.productType); // Добавлено
    formData.append("Smth", values.smth);
    if (file) formData.append("image", file);
  
    try {
      if (selectedProduct) {
        await $api.put(`/api/products/${selectedProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Продукт обновлён");
      } else {
        await $api.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Продукт добавлен");
      }
      setIsModalOpen(false);
      form.resetFields();
      setSelectedProduct(null);
      setFile(null);
      queryClient.invalidateQueries();
    } catch (error) {
      message.error("Ошибка сохранения продукта");
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await $api.delete(`/api/products/${id}`);
      message.success("Продукт удалён");
      queryClient.invalidateQueries();
    } catch (error) {
      message.error("Ошибка удаления");
    }
  };

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Изображение",
      dataIndex: "productImage",
      key: "productImage",
      render: (img) => img && <img src={`data:image/png;base64,${img}`} alt="product" width={50} />,
    },
    { title: "Название", dataIndex: "productName", key: "productName" },
    { title: "Категория", dataIndex: "productCategory", key: "productCategory" },
    { title: "Дорогая цена", dataIndex: "productPriceExp", key: "productPriceExp", render: (price) => `${price} сум` },
    { title: "Цена", dataIndex: "productPrice", key: "productPrice", render: (price) => `${price} сум` },
    { title: "Количество", dataIndex: "productAmount", key: "productAmount", render: (price) => `${price} ` },
    { title: "Тип", dataIndex: "productType", key: "productType", render: (price) => `${price} ` },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => openEditModal(record)} style={{ marginRight: 8 }}>
            Редактировать
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>Удалить</Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.productsTable}>
      <Input
        placeholder="Поиск по названию и категории"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginLeft: 10 }}>
        Добавить продукт
      </Button>
      <Table dataSource={filteredProducts} columns={columns} loading={isLoading} rowKey="id" />
      <Modal
        title={selectedProduct ? "Редактировать продукт" : "Добавить продукт"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="productName" label="Название" rules={[{ required: true, message: "Введите название" }]}> 
            <Input />
          </Form.Item>
          <Form.Item
  name="productCategory"
  label="Категория"
  rules={[{ required: true, message: "Введите категорию" }]}
>
  <Select
    showSearch
    allowClear
    placeholder="Выберите или введите категорию"

  >
    <Select.Option value="Овощи">Овощи</Select.Option>
    <Select.Option value="Фрукты">Фрукты</Select.Option>
    <Select.Option value="Напитки">Напитки</Select.Option>
    <Select.Option value="Молочные продукты ">Молочные продукты </Select.Option>
    <Select.Option value="Бакалея  ">Бакалея  </Select.Option> 
    <Select.Option value="Яйца  ">Яйца  </Select.Option>
  </Select>
</Form.Item>

          <Form.Item name="productPriceExp" label="Дорогая цена" rules={[{ required: true, message: "Введите дорогую цену" }]}> 
            <Input type="number" step="1" min="0" />
          </Form.Item>
          <Form.Item name="productPrice" label="Цена" rules={[{ required: true, message: "Введите цену" }]}> 
            <Input type="number" step="1" min="0" />
          </Form.Item>
          <Form.Item name="productAmount" label="Количество" rules={[{ required: true, message: "Введите количество" }]}> 
  <Input type="number" step="1" min="0" />
</Form.Item>

<Form.Item
  name="productType"
  label="Тип продукта"
  rules={[{ required: true, message: "Выберите тип продукта" }]}
>
  <Select placeholder="Выберите тип">
    <Select.Option value="шт">Штука (шт)</Select.Option>
    <Select.Option value="кг">Килограмм (кг)</Select.Option>
  </Select>
</Form.Item>


          <Form.Item name="smth" label="Примечание">
            <Input />
          </Form.Item>
          <Form.Item label="Изображение">
            <Upload beforeUpload={(file) => { setFile(file); return false; }} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Выбрать файл</Button>
            </Upload>
            {file && <p>{file.name}</p>}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsTable;