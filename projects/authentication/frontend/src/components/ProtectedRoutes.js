import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/auth" />;
}
export default ProtectedRoutes;