import UsersTable from "../../features/admin/components/UsersTable";
import { useOnCheckAdmin } from "../../features/app/service/queries";
import { RouteModel } from "../../features/app/utils/models/RouteModel";
import { AdminPaths } from "./adminPaths";


 const allRootRoutes: RouteModel[] = [
  {
    element: UsersTable , // Компоненты передаются как JSX
    isExact: false,
    path: AdminPaths.USERSTABLE,
    permissionName: "userstable",
  },

];
export const AdminRoutes = (): RouteModel[] => {
  const { data, isLoading, isError } = useOnCheckAdmin();
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
console.log(data)
  const adminRoutes: RouteModel[] = data?.UserName == import.meta.env.VITE_ADMIN_NAME && data?.Password ==import.meta.env.VITE_ADMIN_PASSWORD ? allRootRoutes : [];

  return adminRoutes;
};