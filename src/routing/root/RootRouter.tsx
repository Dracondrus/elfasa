import React, { Suspense } from "react";
import { Route, useLocation } from "react-router";
import { Routes } from "react-router-dom";

import {  rootRoutes } from "./rootRoutes";
import MainLayout from "../../features/app/components/main-layout/MainLayout";

import NotFound from "../../features/app/components/not-found/NotFound";
import Loading from "../../features/app/components/loading/Loading";
import UsersTable from "../../features/admin/components/UsersTable";
// import { LocalStorage } from "../../hooks/LocalStorage";
// import { USER } from "../../features/app/utils/constants/LocalStorageKeys";

const RootRouter: React.FC = () => {
  // const isadmin = LocalStorage.get(USER);
const userws=  useLocation();
console.log(userws.pathname)
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/elfasa" element={<MainLayout />}>
        {rootRoutes()?.map((route, index) => (
              <Route
                key={index}
                path={`/elfasa/${route.path}`}
                element={<route.element />}
              />
            ))}
            </Route>
            <Route path="/elfasa/userstable" element={<UsersTable/>}/>
            {/* {isadmin ? <Route path="/elfasa/" element={<UsersTable/>}/>: <Route path="*" element={<NotFound />} />} */}
            <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
