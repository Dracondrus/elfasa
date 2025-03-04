import { Input, message, Modal } from "antd";
import { useState, useEffect } from "react";

import { useGetProducts } from "../../service/queries";
import IsError from "../IsError/IsError";
import IsLoading from "../loading/Loading";

import styles from "./Products.module.scss";

const Products: React.FC = () => {
    const { data: products, isLoading, isError } = useGetProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

    // Загружаем данные из localStorage при первом рендере
    useEffect(() => {
        const storedProducts = localStorage.getItem("user_select_products");
        if (storedProducts) {
            setSelectedProducts(JSON.parse(storedProducts));
        }
    }, []);

    if (isLoading) return <IsLoading />;
    if (isError) return <IsError />;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredProducts = products?.filter(
        (product) =>
            product.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.productCategory.toLowerCase().includes(lowerCaseSearchTerm)
    ) || [];

    const onGetProduct = (product: any) => {
        const userToken = localStorage.getItem("ELFASA_SETUP_USERTOKEN");

        if (!userToken) {
            setIsAuthModalVisible(true); // Показываем модальное окно
            return;
        }

        const isAlreadySelected = selectedProducts.some((p) => p.id === product.id);

        if (isAlreadySelected) {
            message.warning("Вы уже выбрали этот продукт!");
        } else {
            const updatedProducts = [...selectedProducts, product];
            setSelectedProducts(updatedProducts);
            localStorage.setItem("user_select_products", JSON.stringify(updatedProducts));
            message.success("Вы добавили продукт в корзинку!");
        }
    };

    return (
        <div className={styles.container}>
            <Input
                className={styles.input}
                placeholder="Поиск по названию и категории"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={styles.products}>
                {filteredProducts.map((product) => (
                    <div key={`product-${product.id}`} className={styles.product}>
                        <div className={styles.img}>
                            <img
                                src={`data:image/png;base64,${product.productImage}`}
                                alt={product.productName}
                                loading="lazy"
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.productDesc}>
                            <div className={styles.productName}>{product.productName}</div>
                            <div className={styles.productPriceExp}>{product.productPriceExp} сум</div>
                            <div className={styles.productPrice}>{product.productPrice} сум</div>
                            <button onClick={() => onGetProduct(product)} className={styles.btn}>
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальное окно при отсутствии авторизации */}
            <Modal
                title="Вы не можете добавить!"
                open={isAuthModalVisible}
                onCancel={() => setIsAuthModalVisible(false)}
                footer={null}
                centered
                style={{ color: "red" }} // Красный цвет заголовка
            >
                <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                    Вы должны быть авторизованы!
                </p>
            </Modal>
        </div>
    );
};

export default Products;
