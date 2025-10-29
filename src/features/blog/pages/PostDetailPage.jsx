import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import Navbar from "../../auth/components/Navbar"; // 🆕 Importar Navbar

export default function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPost, findPostById } = useBlog();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cachedPost = findPostById(id);

        if (cachedPost) {
            console.log("✅ Post encontrado en caché:", cachedPost);
            setPost(cachedPost);
            setLoading(false);
        } else {
            console.log("📡 Cargando post desde API...");
            getPost(id)
                .then((data) => {
                    console.log("✅ Post cargado:", data);
                    setPost(data);
                })
                .catch(() => setError("No se pudo cargar el post"))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex justify-center items-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando post...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <p className="text-red-600 text-xl mb-4">{error || "Post no encontrado"}</p>
                        <Link
                            to="/blog"
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                            ← Volver al blog
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar /> {/* 🆕 Agregar Navbar */}

            <div className="max-w-3xl mx-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:text-blue-800 flex items-center group font-medium"
                >
                    <svg
                        className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </button>

                <article className="bg-white rounded-xl shadow-lg p-8">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Post #{post.id}
                    </span>

                    <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-6">
                        {post.title}
                    </h1>

                    <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {post.body}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                        >
                            <svg
                                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Ver todos los posts
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}