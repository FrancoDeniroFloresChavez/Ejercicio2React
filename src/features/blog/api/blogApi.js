import axios from "axios";

// API pública de prueba
export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// Obtener todos los posts
export const getPosts = () => api.get("/posts");

// Obtener un post específico
export const getPostById = (id) => api.get(`/posts/${id}`);
