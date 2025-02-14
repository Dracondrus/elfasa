import {  Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import Logotype from "../Logotype/Logotype";

const MainLayout:React.FC = () => {
  
    return (
        <div>
            <Logotype />
            <Navigation />
            <Outlet /> 
        </div>
    )
}

export default MainLayout