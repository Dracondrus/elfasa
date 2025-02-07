import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";

const RequireAuth: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setChecking(false);
  }, [isAuth]);

  if (checking) return null; // Ожидание обновления isAuth

  return isAuth ? <Outlet /> : <Navigate to="/elfasa/auth" replace />;
};

export default RequireAuth;
