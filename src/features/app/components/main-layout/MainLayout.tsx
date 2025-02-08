import {  Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import { useEffect, useState } from "react";


interface IKeys {
    id:number;
    name:string;
}
const MainLayout:React.FC = () => {
    const [keys,setKeys] = useState<IKeys[] >([] )
  useEffect(() => {
    fetch("https://1065-194-93-25-25.ngrok-free.app/api/keys", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" // Добавляем этот заголовок
        }
    })
    .then(response => response.json()) // Если сервер возвращает JSON
    .then(data => {
        console.log(data)
        setKeys(data)
    })
    .catch(error => console.error("Ошибка:", error));
  }, [])

    return (
        <div>
            LOGOTYPE 
            {keys.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
          <br />
            <Navigation/>
          
            <br />
            
            <Outlet/>
            
            
            </div>
    )
}

export default MainLayout