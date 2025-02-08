import { useGetKeys } from "../../service/queries";
import IsError from "../IsError/IsError";
import IsLoading from "../IsLoading/IsLoading";


const Products:React.FC = () => {
    const {data:keys, isLoading,error} = useGetKeys()
    if (isLoading) return <IsLoading/>;
    if (error) return <IsError/>;

    return (
        <div> Products
            <br />
            {keys?.map(ke => (
                <div key={ke.id}>{ke.id} {ke.name}</div>
            ))}
        </div>
    )
}

export default Products