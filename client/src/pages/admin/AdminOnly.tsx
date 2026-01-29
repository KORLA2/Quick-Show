import { Navigate, Outlet } from "react-router-dom";
import type { AdminType } from "../../types/AdminType";
import Loading from "../../components/Loading";

export const AdminOnly = ({ Admin }: { Admin: AdminType | null }) => {
  
  console.log(Admin)
  
  if (Admin === null) 
    return <Loading/>;
     // loader

  if (!Admin) {
    return <Navigate to="/admin/auth" replace />;
  }

  return <Outlet />;
};
