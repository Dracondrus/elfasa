
import Delivery from "../../features/app/components/delivery/Delivery";
import Order from "../../features/app/components/order/Order";
import Profile from "../../features/app/components/profile/Profile";
import { RouteModel } from "../../features/app/utils/models/RouteModel";
import { rootPaths } from "./rootPaths";


export const allRootRoutes: RouteModel[] = [
  {
    element: Order , // Компоненты передаются как JSX
    isExact: true,
    path: rootPaths.ORDER,
    permissionName: "Order",
  },
  {
    element: Profile ,
    isExact: true,
    path: rootPaths.PROFILE,
    permissionName: "Profile",
  },
  {
    element: Delivery,
    isExact: true,
    path: rootPaths.DELIVERY,
    permissionName: "Delivery",
  }

];
export const rootRoutes = (): RouteModel[] => {

  const routes: RouteModel[] =  allRootRoutes ;

  return routes;
};