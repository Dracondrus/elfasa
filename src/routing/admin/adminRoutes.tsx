
import KeysTable from "../../features/admin/components/keys-table/KeysTable";
import OrdersTable from "../../features/admin/components/orders-table/OrdersTable";
import ProductsTable from "../../features/admin/components/products-table/ProductsTable";
import UsersTable from "../../features/admin/components/users-table/UsersTable";
import WorkersTable from "../../features/admin/components/workers-table/WorkersTable";
import { RouteModel } from "../../features/app/utils/models/RouteModel";
import { AdminPaths } from "./adminPaths";


 const allRootRoutes: RouteModel[] = [
  {
    element: UsersTable , 
    isExact: true,
    path: AdminPaths.USERSTABLE,
    permissionName: "userstable",
  },
  {
    element: KeysTable , 
    isExact: true,
    path: AdminPaths.KEYSTABLE,
    permissionName: "keystable",
  },
  {
    element: OrdersTable , 
    isExact: true,
    path: AdminPaths.ORDERSTABLE,
    permissionName: "orderstable",
  },
  {
    element: ProductsTable , 
    isExact: true,
    path: AdminPaths.PRODUCTSTABLE,
    permissionName: "productstable",
  },
  {
    element: WorkersTable , 
    isExact: true,
    path: AdminPaths.WORKERSTABLE,
    permissionName: "workerstable",
  },
];
export const adminRoutes = (): RouteModel[] => {

 const adminRoutes: RouteModel[] =  allRootRoutes ;
  return adminRoutes;
};