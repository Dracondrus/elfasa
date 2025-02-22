import {  Input } from "antd";
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
                     <div className={styles.img}>
                     <img 
                            src={`data:image/png;base64,${product.productImage}`} 
                            alt={product.productName} 
                            className={styles.productImage} 
                        />
                     </div>
                        <div className={styles.productDesc}>
                            <div className={styles.productName}>{product.productName}</div>
                            <div className={styles.productPriceExp}>{product.productPriceExp} сум</div>
                            <div className={styles.productPrice}>{product.productPrice} сум</div>
                            <button onClick={() =>onGetProduct(product.id)} className={styles.btn} > +</button>
                        </div>
                     
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;