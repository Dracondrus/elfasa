import { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { useGetProducts } from "../../service/queries";
import IsError from "../IsError/IsError";
import IsLoading from "../loading/Loading";
import { IProduct } from "../../utils/models/ProductModel";

import styles from "./Order.module.scss";

const Order: React.FC = () => {
    const { data: products, isLoading, isError } = useGetProducts();
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const storedProducts = localStorage.getItem("user_select_products");
        if (storedProducts) {
            try {
                const parsedProducts: IProduct[] = JSON.parse(storedProducts);
                setSelectedProducts(parsedProducts);
                const initialQuantities = parsedProducts.reduce((acc, product) => {
                    acc[product.id] = product.productAmount || 1;
                    return acc;
                }, {} as { [key: number]: number });
                setQuantities(initialQuantities);
            } catch  {
                console.error("Ошибка :)");
            }
        }
    }, [products]);

    const updateLocalStorage = (updatedProducts: IProduct[]) => {
        localStorage.setItem("user_select_products", JSON.stringify(updatedProducts));
    };

    const updateProductAmount = (id: number, newAmount: number) => {
        setSelectedProducts((prevProducts) => {
            const updatedProducts = prevProducts.map(product => 
                product.id === id ? { ...product, productAmount: newAmount } : product
            );
            updateLocalStorage(updatedProducts);
            return updatedProducts;
        });
    };

    const increaseQuantity = (id: number) => {
        setQuantities((prev) => {
            const newQuantities = { ...prev, [id]: (prev[id] || 1) + 1 };
            updateProductAmount(id, newQuantities[id]);
            return newQuantities;
        });
    };

    const decreaseQuantity = (id: number) => {
        setQuantities((prev) => {
            const newQuantities = { ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) };
            updateProductAmount(id, newQuantities[id]);
            return newQuantities;
        });
    };

    const totalPrice = selectedProducts.reduce(
        (sum, product) => sum + product.productPrice * (quantities[product.id] || 1),
        0
    ).toLocaleString("ru-RU");

    if (isLoading) return <IsLoading />;
    if (isError) return <IsError />;

    return (
        <div className={styles.container}>
            {selectedProducts.length === 0 ? (
                <p>Вы пока не выбрали продукты :)</p>
            ) : (
                <div>
                    <h4>Ваши продукты</h4>
                    <br />
                    <ul className={styles.productList}>
                        {selectedProducts.map((product) => (
                            <li key={product.id} className={styles.productItem}>
                                <div className={styles.productInfo}>
                                    <div className={styles.productName}>{product.productName}</div>
                                    <div className={styles.price}>
                                        {(product.productPrice * (quantities[product.id] || 1)).toLocaleString("ru-RU")} сум
                                    </div>
                                </div>
                                <div className={styles.controls}>
                                    <button className={styles.minus} onClick={() => decreaseQuantity(product.id)}>
                                        <MinusOutlined />
                                    </button>
                                    <span className={styles.quantity}>{quantities[product.id]} {product.productType}</span>
                                    <button className={styles.plus} onClick={() => increaseQuantity(product.id)}>
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <div className={styles.flex}>Общая сумма: <div className={styles.totalPrice}>{totalPrice}</div> сум</div>
                 <button className={styles.order}>Заказать</button>
                </div>
            )}
            
        </div>
    );
};

export default Order;
