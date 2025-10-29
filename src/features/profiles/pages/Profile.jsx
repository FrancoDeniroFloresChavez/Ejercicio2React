import { useAuth } from "../../auth/context/AuthContext"; // 🔧 Ruta ajustada
import { Link } from "react-router-dom";
import Navbar from "../../auth/components/Navbar"; // 🔧 Ruta ajustada

export default function Profile() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header del perfil */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>

                    <div className="px-8 pb-8">
                        {/* Avatar */}
                        <div className="flex items-end gap-6 -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg
                                bg-gradient-to-br from-blue-500 to-purple-500 
                                flex items-center justify-center text-white font-bold text-4xl">
                                {(user.name || user.email)?.charAt(0).toUpperCase()}
                            </div>
                            <div className="pb-2">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {user.name || 'Usuario'}
                                </h1>
                                <p className="text-gray-600">
                                    {user.paternal_lastname} {user.maternal_lastname}
                                </p>
                            </div>
                        </div>

                        {/* Información del perfil */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Columna izquierda */}
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        📧 Correo electrónico
                                    </label>
                                    <p className="text-gray-800">{user.email || 'No disponible'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        🆔 Número de documento
                                    </label>
                                    <p className="text-gray-800">{user.document_number || 'No disponible'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        📱 Teléfono
                                    </label>
                                    <p className="text-gray-800">{user.phone || 'No disponible'}</p>
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        🎂 Fecha de nacimiento
                                    </label>
                                    <p className="text-gray-800">
                                        {user.birthdate
                                            ? new Date(user.birthdate).toLocaleDateString('es-ES')
                                            : 'No disponible'}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        👤 ID de usuario
                                    </label>
                                    <p className="text-gray-800">{user.id}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-sm font-semibold text-gray-600 block mb-1">
                                        📸 Foto de perfil
                                    </label>
                                    <p className="text-gray-800">
                                        {user.photo_url ? (
                                            <img
                                                src={user.photo_url}
                                                alt="Profile"
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        ) : (
                                            'No disponible'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/blog"
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                                    hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                            >
                                <span>📝</span>
                                <span>Ir al Blog</span>
                            </Link>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}