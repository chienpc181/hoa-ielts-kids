import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({isAllowed, children }) => {
  const redirectPath = "/login";

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet/>
};

export default AdminRoute;
