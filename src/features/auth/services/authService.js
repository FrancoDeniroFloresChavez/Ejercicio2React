import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://reflexoperu-v3.marketingmedico.vip/backend/public/api";

const api = axios.create({
    baseURL: API_URL,
});

// 🔹 Registrar usuario
export const registerUser = async (data) => {
    const res = await api.post("/register", data);
    return res.data;
};

// 🔹 Iniciar sesión (recibe access y refresh token)
export const loginUser = async (data) => {
    const res = await api.post("/login", data);
    return res.data;
};

// 🔹 Renovar token automáticamente
export const refreshToken = async (refreshToken) => {
    const res = await api.post("/token/refresh", {
        refresh: refreshToken
    });
    return res.data;
};

// 🔹 Obtener perfil del usuario autenticado
export const getProfile = async () => {
    const token = Cookies.get("token");
    const res = await api.get("/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// 🔹 Cerrar sesión
export const logoutUser = async () => {
    const token = Cookies.get("token");
    const res = await api.delete("/logout", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};