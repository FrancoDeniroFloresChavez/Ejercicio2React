import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const token = Cookies.get("token");

    if (!token || !user) {
        console.log(" Acceso denegado, redirigiendo a login");
        return <Navigate to="/login" replace />;
    }

    return children;
}