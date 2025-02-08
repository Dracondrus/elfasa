import {  Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"


export interface IKeys {
    id:number;
    name:string;
}
const MainLayout:React.FC = () => {

  
    return (
        <div>
            LOGOTYPE
          <br />
            <Navigation/>
          
            <br />
            
            <Outlet/>
            
            
            </div>
    )
}

export default MainLayout