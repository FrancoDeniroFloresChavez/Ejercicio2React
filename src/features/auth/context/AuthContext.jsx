import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loginUser, logoutUser, getProfile, refreshToken } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(() => {
        const storedTokens = localStorage.getItem("tokens");
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    // Cargar perfil al iniciar si hay token
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            console.log("🔑 Token encontrado, cargando perfil...");
            getProfile()
                .then((res) => {
                    console.log("✅ Perfil cargado:", res);
                    setUser(res);
                })
                .catch((err) => {
                    console.error("❌ Error al cargar perfil:", err);
                    setUser(null);
                    Cookies.remove("token");
                });
        }
    }, []);

    // 🔄 RENOVACIÓN AUTOMÁTICA CADA 4 MINUTOS
    useEffect(() => {
        if (tokens?.refresh) {
            console.log("⏰ Iniciando renovación automática de token");

            const interval = setInterval(async () => {
                try {
                    console.log("🔄 Renovando token...");
                    const response = await refreshToken(tokens.refresh);

                    const newTokens = {
                        access: response.access || response.token,
                        refresh: response.refresh || tokens.refresh
                    };

                    setTokens(newTokens);
                    Cookies.set("token", newTokens.access);
                    localStorage.setItem("tokens", JSON.stringify(newTokens));

                    console.log("✅ Token renovado exitosamente");
                } catch (error) {
                    console.error("❌ Error renovando token:", error);
                    logout();
                }
            }, 1000 * 60 * 4); // Cada 4 minutos

            return () => {
                console.log("🛑 Deteniendo renovación automática");
                clearInterval(interval);
            };
        }
    }, [tokens]);

    const login = async (email, password) => {
        console.log("🔵 AuthContext: Llamando loginUser");
        const data = await loginUser({ email, password });
        console.log("✅ AuthContext: Response de login:", data);

        // Guardar tokens
        const newTokens = {
            access: data.token,
            refresh: data.refresh_token || data.token
        };

        setTokens(newTokens);
        Cookies.set("token", newTokens.access);
        localStorage.setItem("tokens", JSON.stringify(newTokens));
        console.log("🍪 Tokens guardados");

        // Obtener perfil
        const profile = await getProfile();
        console.log("✅ AuthContext: Perfil obtenido:", profile);
        setUser(profile);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }

        setTokens(null);
        setUser(null);
        Cookies.remove("token");
        localStorage.removeItem("tokens");
        console.log("👋 Sesión cerrada");
    };

    return (
        <AuthContext.Provider value={{ user, tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);