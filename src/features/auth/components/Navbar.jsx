import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // Helper para saber si un link está activo
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <span className="text-2xl">📚</span>
                        <span className="text-xl font-bold text-gray-800">
                            React Blog
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/blog"
                            className={`flex items-center gap-2 font-medium transition-colors duration-200 ${isActive('/blog') || isActive('/')
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            <span>📝</span>
                            <span>Blog</span>
                        </Link>

                        <Link
                            to="/profile"
                            className={`flex items-center gap-2 font-medium transition-colors duration-200 ${isActive('/profile')
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            <span>👤</span>
                            <span>Perfil</span>
                        </Link>

                        {/* User Menu */}
                        {user && (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 
                                        rounded-full flex items-center justify-center text-white 
                                        font-bold text-sm">
                                        {(user.name || user.email)?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.name || user.email}
                                    </span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium
                                        hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <span>🚪</span>
                                    <span>Salir</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}