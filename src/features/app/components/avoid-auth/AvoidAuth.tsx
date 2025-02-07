import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../../../../hooks/redux";

const AvoidAuth: React.FC = () => {

  const { isAuth } = useAppSelector((state) => state.userReducer);

  return !isAuth ? <Outlet /> : <Navigate to={"/elfasa"} />;
};

export default AvoidAuth;
