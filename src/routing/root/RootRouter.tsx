import React, { Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import { exactRouteFixer } from "../../features/app/utils/helpers/exactRouterFixer";
import { adminRoutes } from "../admin/adminRoutes";
import {  rootRoutes } from "./rootRoutes";
import MainLayout from "../../features/app/components/main-layout/MainLayout";
import NotFound from "../../features/app/components/not-found/NotFound";
import Loading from "../../features/app/components/loading/Loading";

import AvoidAuth from "../../features/app/components/avoid-auth/AvoidAuth";
import Auth from "../../features/app/components/auth/Auth";
import RequireAuth from "../../features/app/components/require-auth/RequireAuth";
import AdminRequire from "../../features/admin/components/admin-require/AdminRequire";
import AdminLayout from "../../features/admin/components/admin-layout/AdminLayout";
import Products from "../../features/app/components/products/Products";
import Admin from "../../features/admin/components/admin/admin";

const RootRouter: React.FC = () => {


  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route element={<AvoidAuth/>}>
          <Route path="elfasa/auth" element={<Auth/>}/>
        </Route>
      <Route path="elfasa/" element={<MainLayout />}>
      <Route index element={<Products />} /> 
        <Route element={<RequireAuth/>}>
        {rootRoutes()?.map((route, index) => (
              <Route
                key={index}
                path={`${exactRouteFixer(route.path!, route.isExact)}`}
                element={<route.element />}
              />
            ))}
        </Route>
        <Route  element={<AdminRequire />}>
            <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin/>}/>
              {adminRoutes()?.map((route, index) => (
                <Route
                  key={index}
                  path={exactRouteFixer(route.path!, route.isExact)}
                  element={<route.element />}
                />
              ))}
            </Route>
          </Route>
      </Route>
            <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
