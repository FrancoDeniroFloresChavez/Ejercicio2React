import { createContext, useContext, useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import {
    loginUser,
    logoutUser,
    getProfile,
    refreshToken,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(() => {
        const storedTokens = localStorage.getItem("tokens");
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const isLoadingProfile = useRef(false);

    // 🟢 Cargar perfil al iniciar si hay token
    useEffect(() => {
        const token = Cookies.get("token");

        if (isLoadingProfile.current) {
            console.log("⚠️ Ya hay una carga de perfil en proceso, ignorando...");
            return;
        }

        if (token && !user) {
            isLoadingProfile.current = true;
            console.log("🔑 Token encontrado, cargando perfil...");

            getProfile()
                .then((res) => {
                    console.log("✅ Perfil cargado:", res);
                    setUser(res);
                })
                .catch((err) => {
                    console.error("❌ Error al cargar perfil:", err);
                    if (err.response?.status === 401) {
                        console.log("🔒 Token inválido, limpiando sesión...");
                        setUser(null);
                        Cookies.remove("token");
                        localStorage.removeItem("tokens");
                    }
                })
                .finally(() => {
                    setLoading(false);
                    isLoadingProfile.current = false;
                });
        } else if (!token) {
            setLoading(false);
        } else if (user) {
            setLoading(false);
        }
    }, [user]);

    // 🔄 Renovación automática cada 4 minutos
    useEffect(() => {
        if (tokens?.refresh && user) {
            console.log("⏰ Iniciando renovación automática de token");

            const interval = setInterval(async () => {
                try {
                    console.log("🔄 Renovando token...");
                    const response = await refreshToken(tokens.refresh);

                    const newTokens = {
                        access: response.access || response.token,
                        refresh: response.refresh || tokens.refresh,
                    };

                    setTokens(newTokens);
                    Cookies.set("token", newTokens.access, { expires: 7 });
                    localStorage.setItem("tokens", JSON.stringify(newTokens));

                    console.log("✅ Token renovado exitosamente");
                } catch (error) {
                    console.error("❌ Error renovando token:", error);
                    logout();
                }
            }, 1000 * 60 * 4);

            return () => {
                console.log("🛑 Deteniendo renovación automática");
                clearInterval(interval);
            };
        }
    }, [tokens, user]);

    // 🔐 LOGIN
    const login = async (email, password) => {
        console.log("🔵 AuthContext: Llamando loginUser");
        try {
            const data = await loginUser({ email, password });
            console.log("✅ AuthContext: Response de login:", data);

            const newTokens = {
                access: data.token,
                refresh: data.refresh_token || data.token,
            };

            setTokens(newTokens);
            Cookies.set("token", newTokens.access, { expires: 7 });
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            console.log("🍪 Tokens guardados");

            isLoadingProfile.current = true;

            const profile = await getProfile();
            console.log("✅ AuthContext: Perfil obtenido:", profile);
            setUser(profile);

            isLoadingProfile.current = false;

            return true;
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error);
            isLoadingProfile.current = false;
            throw error;
        }
    };

    // 🚪 LOGOUT
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
        setLoading(false);
        console.log("👋 Sesión cerrada");
    };

    return (
        <AuthContext.Provider value={{ user, tokens, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};