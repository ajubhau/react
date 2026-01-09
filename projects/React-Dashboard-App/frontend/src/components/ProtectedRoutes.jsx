import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"

function ProtectedRoutes({ children }){
     const select = useSelector((state) => state.auth.userInfo);

    if (Object.keys(select).length == 0) {
        return <Navigate to="/login" />
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoutes;