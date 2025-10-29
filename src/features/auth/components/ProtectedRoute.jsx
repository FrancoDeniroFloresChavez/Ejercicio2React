import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Verificando sesión...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        console.log("❌ No hay usuario, redirigiendo a /login");
        return <Navigate to="/login" replace />;
    }

    console.log("✅ Usuario autenticado, permitiendo acceso");
    return <Outlet />;
}