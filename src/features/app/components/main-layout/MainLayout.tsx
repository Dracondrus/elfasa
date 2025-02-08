import {  Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import { useEffect, useState } from "react";
import $api from "../../utils/helpers/axiosInstance";
import axios from "axios";


interface KeyModel {
    id:number,
    name: string;
}

const MainLayout:React.FC = () => {
    const [keys, setKeys] = useState<KeyModel[] | null>(null);
    const [data, setData] = useState<KeyModel[] | null>(null);
    useEffect(() => {
        $api.get<KeyModel[]>("api/keys")
            .then((response) => {
                setKeys(response.data);
               
            })
            .catch(() => {
               console.log("")
            })
            .finally(() => {
                console.log("")
            });
    }, []);




    useEffect(() => {
        axios.get<KeyModel[]>("https://e3e7-194-93-25-25.ngrok-free.app/api/keys")
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
               console.log("")
            })
            .finally(() => {
                console.log("")
            });
    }, []);

console.log(keys)
console.log(data)

    return (
        <div>
            LOGOTYPE 
          
            <Navigation/>
            {keys?.map(item => (
                <div key={item.name}>
                    <h3>{item.id}</h3><br />
                    <h3>{item.name}</h3><br />
                </div>
            ))}
            <br />
            
            <Outlet/>
            
            
            </div>
    )
}

export default MainLayout