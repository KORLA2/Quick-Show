import { Navigate, Outlet } from "react-router-dom";
import type { AdminType } from "../../types/AdminType";
import Loading from "../../components/Loading";

export const GuestOnly = ({Admin}:{Admin:AdminType|null}) => {
 
  console.log(Admin)
  if (Admin === null) 
    return <Loading/>

  if (Admin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};
