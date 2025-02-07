import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import {  rootRoutes } from "./rootRoutes";
import MainLayout from "../../features/app/components/main-layout/MainLayout";
import { exactRouteFixer } from "../../features/app/utils/helpers/exactRouterFixer";
import NotFound from "../../features/app/components/not-found/NotFound";
import Loading from "../../features/app/components/loading/Loading";
import UsersTable from "../../features/admin/components/UsersTable";
import AvoidAuth from "../../features/app/components/avoid-auth/AvoidAuth";
import Auth from "../../features/app/components/auth/Auth";
import RequireAuth from "../../features/app/components/require-auth/RequireAuth";

const RootRouter: React.FC = () => {


  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route element={<AvoidAuth/>}>
        <Route path="/elfasa/auth" element={<Auth/>}/></Route>
        <Route path="elfasa/" element={<MainLayout />}>
        <Route element={<RequireAuth/>}>
        {rootRoutes()?.map((route, index) => (
              <Route
                key={index}
                path={`/elfasa/${exactRouteFixer(route.path!, route.isExact)}`}
                element={<route.element />}
              />
            ))}
        </Route>
            </Route>
           
            <Route path="/elfasa/userstable" element={<UsersTable/>}/>
            <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
