import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../../auth/context/AuthContext";
import Navbar from "../../auth/components/Navbar"; // 🆕 Importar Navbar

export default function BlogPage() {
    const { posts, loading, error, loadPosts } = useBlog();
    const { user } = useAuth();

    useEffect(() => {
        console.log("🔵 BlogPage useEffect ejecutado");
        loadPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar /> {/* 🆕 Agregar Navbar */}

            <div className="max-w-7xl mx-auto p-6">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Blog</h1>
                    {user && (
                        <p className="text-gray-600 mt-2">
                            Bienvenido, {user.name || user.paternal_lastname || 'Usuario'}
                        </p>
                    )}
                </header>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="ml-4 text-gray-600 text-lg">Cargando publicaciones...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No hay publicaciones disponibles.</p>
                    </div>
                )}

                {!loading && !error && posts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                        Post #{post.id}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.body}
                                </p>

                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                                >
                                    Leer más
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}