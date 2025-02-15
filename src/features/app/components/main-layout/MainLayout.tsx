import {  Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import Logotype from "../logotype/Logotype";

const MainLayout:React.FC = () => {
    return (
        <div>
            <Logotype /> 
            <Navigation />
           <div className="padding"> <Outlet /></div>
           
        </div>
    )
}

export default MainLayout

