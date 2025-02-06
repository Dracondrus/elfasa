import { NavLink, Outlet } from "react-router-dom"
import { AdminPaths } from "../../../../routing/admin/adminPaths"


const MainLayout:React.FC = () => {
    console.log(`/elfasa/${AdminPaths.USERSTABLE}`)
    return (
        <div>main layout 
            <br />
            <NavLink to={"/elfasa"}>Main</NavLink><br />
            <NavLink to={"/elfasa/profile"}>Profile</NavLink><br />
            <NavLink to={"/elfasa/order"}>Order</NavLink><br />
            <NavLink to={`/elfasa/userstable`}>USERSTABLE</NavLink><br />
            <br />
            <br />
            <Outlet/></div>
    )
}

export default MainLayout