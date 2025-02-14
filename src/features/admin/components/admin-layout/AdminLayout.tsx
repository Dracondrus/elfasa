import { Outlet } from "react-router-dom"


const AdminLayout :React.FC = () => {


    return (
        <div className="admin__container">
            <Outlet/>
        </div>
    )
}
export default AdminLayout