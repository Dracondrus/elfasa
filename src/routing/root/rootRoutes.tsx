
import Order from "../../features/app/components/order/Order";
import Profile from "../../features/app/components/profile/Profile";
import { useOnCheckUser } from "../../features/app/service/queries";
import { RouteModel } from "../../features/app/utils/models/RouteModel";
import { rootPaths } from "./rootPaths";


export const allRootRoutes: RouteModel[] = [
  {
    element: Order , // Компоненты передаются как JSX
    isExact: false,
    path: rootPaths.ORDER,
    permissionName: "Order",
  },
  {
    element: Profile ,
    isExact: false,
    path: rootPaths.PROFILE,
    permissionName: "Profile",
  },
];
export const rootRoutes = (): RouteModel[] => {
  const { data, isLoading, isError } = useOnCheckUser();
    console.log(data)
  setTimeout(() => {
   
    if (data) {
      console.log("");
    }
  }, 1000); 

  if (isLoading) {
 console.log("")
  }

  if (isError) {
   console.log("")
  }
  fetch('https://36d7-194-93-25-25.ngrok-free.app/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
  fetch('http://localhost:7777/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
  const routes: RouteModel[] =  allRootRoutes ;

  return routes;
};