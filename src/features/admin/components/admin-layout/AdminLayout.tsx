import { Outlet } from "react-router-dom"


const AdminLayout :React.FC = () => {


    return (
        <div>ADminlayout 
            <br />
            <br />
            <Outlet/>
        </div>
    )
}
export default AdminLayout