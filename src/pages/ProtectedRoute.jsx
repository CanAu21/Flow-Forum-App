import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // kullancıcı yoksa login sayfasına yönlendir
  if (!token) return <Navigate to={"/login"} />;

  // alt route ekrana basar
  return <Outlet />;
};

export default ProtectedRoute;
