
import UsersTable from "../../features/admin/components/users-table/UsersTable";
import { RouteModel } from "../../features/app/utils/models/RouteModel";
import { AdminPaths } from "./adminPaths";


 const allRootRoutes: RouteModel[] = [
  {
    element: UsersTable , // Компоненты передаются как JSX
    isExact: true,
    path: AdminPaths.USERSTABLE,
    permissionName: "userstable",
  },

];
export const adminRoutes = (): RouteModel[] => {

 const adminRoutes: RouteModel[] =  allRootRoutes ;
  return adminRoutes;
};