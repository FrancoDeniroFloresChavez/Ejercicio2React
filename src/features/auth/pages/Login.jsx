import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                console.log("✅ Login exitoso, redirigiendo...");
                navigate("/blog", { replace: true });
            } else {
                setError("Credenciales inválidas");
            }
        } catch (err) {
            console.error("❌ Error al iniciar sesión:", err);
            setError(err.response?.data?.message || "Ocurrió un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <label className="block mb-2 text-gray-700">Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block mb-2 text-gray-700">Contraseña</label>
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                        {showPassword ? "Ocultar" : "Ver"}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {loading ? "Cargando..." : "Ingresar"}
                </button>
            </form>
        </div>
    );
}