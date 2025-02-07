
 import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LocalStorage } from "../../../app/service/LocalStorage";
import { USER } from "../../../app/utils/constants/LocalStorageKeys";


const AdminRequire: React.FC = () => {
  
   const isAdmin =LocalStorage.get(USER) == import.meta.env.VITE_ADMIN_KEY;
  return isAdmin ? <Outlet /> : <Navigate to={"elfasa/notfound"} />;
};

export default AdminRequire;
