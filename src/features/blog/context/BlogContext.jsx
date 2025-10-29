import { createContext, useContext, useState } from "react";
import { getPosts, getPostById } from "../api/blogApi";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 📋 Cargar todos los posts
    const loadPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("📡 Cargando posts...");
            const response = await getPosts();
            console.log("✅ Posts cargados:", response.data);

            setPosts(response.data.slice(0, 10));
            return response.data;
        } catch (err) {
            console.error("❌ Error cargando posts:", err);
            setError("No se pudieron cargar las publicaciones");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 📄 Obtener un post específico
    const getPost = async (id) => {
        try {
            console.log(`📡 Cargando post ${id}...`);
            const response = await getPostById(id);
            console.log("✅ Post cargado:", response.data);
            return response.data;
        } catch (err) {
            console.error("❌ Error cargando post:", err);
            throw err;
        }
    };

    // 🔄 Buscar post en caché local
    const findPostById = (id) => {
        return posts.find(post => post.id === parseInt(id));
    };

    return (
        <BlogContext.Provider
            value={{
                posts,
                loading,
                error,
                loadPosts,
                getPost,
                findPostById
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog debe usarse dentro de BlogProvider");
    }
    return context;
};