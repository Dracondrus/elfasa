import { Button, Input } from "antd";
import { useState } from "react";
import { useGetProducts } from "../../service/queries";

import IsError from "../IsError/IsError";
import Isloading from "../loading/Loading";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
    const { data: products, isLoading, isError } = useGetProducts();
    const [searchTerm, setSearchTerm] = useState("");

    if (isLoading) return <Isloading />;
    if (isError) return <IsError />;

    const filteredProducts = products?.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const onGetProduct = (id: number) => {
        console.log(id)
    }

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
                    <div key={product.id} className={styles.product}>
                        <img 
                            src={`data:image/png;base64,${product.productImage}`} 
                            alt={product.productName} 
                            className={styles.productImage} 
                        />
                        <div className={styles.productDesc}>
                            <div className={styles.productName}>{product.productName}</div>
                            <div className={styles.productPriceExp}>{product.productPriceExp} сум</div>
                            <p>{product.productPrice} сум</p>
                            <Button onClick={() =>onGetProduct(product.id)} className={styles.btn} type="primary">Добавить +</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;