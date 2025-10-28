# 🔐 Auth Client - Sistema de Autenticación con React

Cliente de autenticación completo desarrollado en React con JWT, renovación automática de tokens y rutas protegidas.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas Disponibles](#rutas-disponibles)
- [Flujo de Autenticación](#flujo-de-autenticación)
- [API Endpoints](#api-endpoints)
- [Características de Seguridad](#características-de-seguridad)
- [Autor](#autor)

## 🎯 Descripción

Sistema de autenticación frontend que consume una API REST para gestionar usuarios, implementando login, registro, manejo de sesiones con JWT y renovación automática de tokens cada 4 minutos.

## ✨ Características

- ✅ **Registro de usuarios** con validación de formularios
- ✅ **Inicio de sesión** con email y contraseña
- ✅ **Persistencia de sesión** usando localStorage y cookies
- ✅ **Renovación automática de tokens JWT** cada 4 minutos
- ✅ **Rutas protegidas** con redirección automática
- ✅ **Perfil de usuario** con información detallada
- ✅ **Diseño moderno y responsive** con Tailwind CSS
- ✅ **Navbar con logout funcional**
- ✅ **Manejo de errores** y estados de carga
- ✅ **Contexto global de autenticación** con React Context API

## 🚀 Tecnologías

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Axios** - Cliente HTTP para peticiones a la API
- **Tailwind CSS** - Framework CSS para diseño
- **JS Cookie** - Gestión de cookies
- **JWT** - JSON Web Tokens para autenticación

## 📦 Requisitos Previos

- Node.js v16 o superior
- npm v7 o superior
- Backend API funcionando (Laravel con endpoints de autenticación)

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/FrancoDeniroFloresChavez/Ejercicio2React.git
cd Ejercicio2React
```

2. **Instala las dependencias**
```bash
npm install
```

## ⚙️ Configuración

### 1. Configurar URL de la API

Edita el archivo `src/features/auth/services/authService.js`:
```javascript
const API_URL = "https://tu-api.com/backend/public/api";
```

Reemplaza con la URL de tu backend.

### 2. Variables de entorno (opcional)

Crea un archivo `.env` en la raíz:
```env
VITE_API_URL=https://tu-api.com/backend/public/api
```

Y actualiza `authService.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## 🏃‍♂️ Ejecución

### Modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Modo producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Barra de navegación
│   │   │   └── ProtectedRoute.jsx   # HOC para rutas protegidas
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Contexto global de autenticación
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Página de inicio de sesión
│   │   │   └── Register.jsx         # Página de registro
│   │   └── services/
│   │       └── authService.js       # Servicios de API
│   └── profiles/
│       └── pages/
│           └── Profile.jsx          # Página de perfil del usuario
├── components/                      # Componentes globales
├── router.jsx                       # Configuración de rutas
├── App.jsx                          # Componente principal
└── main.jsx                         # Punto de entrada
```

## 🗺️ Rutas Disponibles

| Ruta | Componente | Acceso | Descripción |
|------|-----------|--------|-------------|
| `/` | Login | Público | Redirige a login |
| `/login` | Login | Público | Inicio de sesión |
| `/register` | Register | Público | Registro de usuarios |
| `/profile` | Profile | Protegido | Perfil del usuario autenticado |

## 🔄 Flujo de Autenticación

### 1. Registro
```
Usuario → Formulario de registro → API /register
         → Confirmación → Redirección a /login
```

### 2. Inicio de sesión
```
Usuario → Credenciales → API /login
        → Recibe tokens (access + refresh)
        → Guarda en localStorage y cookies
        → Redirección a /profile
```

### 3. Renovación automática
```
Cada 4 minutos:
  → API /token/refresh con refresh token
  → Actualiza access token
  → Guarda nuevo token en cookies
```

### 4. Cierre de sesión
```
Usuario → Click en "Cerrar sesión"
        → API /logout
        → Limpia tokens y cookies
        → Redirección a /login
```

## 🔌 API Endpoints

El frontend consume los siguientes endpoints:

### Registro
```
POST /api/register
Body: {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  user_name: string,
  phone: string
}
```

### Login
```
POST /api/login
Body: {
  email: string,
  password: string
}
Response: {
  token: string,
  refresh_token: string,
  user: object
}
```

### Obtener perfil
```
GET /api/profile
Headers: {
  Authorization: "Bearer {token}"
}
```

### Renovar token
```
POST /api/token/refresh
Body: {
  refresh: string
}
Response: {
  access: string,
  refresh: string
}
```

### Logout
```
DELETE /api/logout
Headers: {
  Authorization: "Bearer {token}"
}
```

## 🛡️ Características de Seguridad

- **Tokens JWT** para autenticación stateless
- **Refresh tokens** para renovación automática de sesión
- **Rutas protegidas** que validan autenticación
- **Cookies seguras** para almacenamiento de tokens
- **Redirección automática** en caso de sesión expirada
- **Validación de formularios** en frontend
- **Manejo de errores** con mensajes informativos

## 🔐 Protección de Rutas

El componente `ProtectedRoute` valida:

1. Existencia de token en cookies
2. Usuario cargado en el contexto
3. Redirección automática a `/login` si falla alguna validación

Ejemplo de uso:
```jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

## 🎨 Características de Diseño

- **Responsive design** - Funciona en móviles, tablets y desktop
- **Gradientes modernos** - Efectos visuales atractivos
- **Glassmorphism** - Efecto de cristal en componentes
- **Animaciones suaves** - Transiciones fluidas
- **Iconos SVG** - Interfaz visual clara
- **Estados visuales** - Loading, success, error

## 📝 Scripts Disponibles
```json
{
  "dev": "vite",              // Servidor de desarrollo
  "build": "vite build",      // Compilar para producción
  "preview": "vite preview",  // Vista previa de producción
  "lint": "eslint ."          // Linter de código
}
```

## 🐛 Solución de Problemas

### Error de CORS

Si encuentras errores de CORS, asegúrate de que tu backend tenga configurado:
```php
// Laravel config/cors.php
'supports_credentials' => true,
'allowed_origins' => ['http://localhost:5173'],
```

### Token expira muy rápido

Ajusta el intervalo de renovación en `AuthContext.jsx`:
```javascript
setInterval(() => {
  // Cambiar 1000 * 60 * 4 por el tiempo deseado en ms
}, 1000 * 60 * 4);
```

### Tailwind no funciona

Si Tailwind no aplica estilos, reinstala:
```bash
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 👤 Autor

**Franco Deniro Flores Chávez**

- GitHub: [@FrancoDeniroFloresChavez](https://github.com/FrancoDeniroFloresChavez)
- Email: francodeniro2025@gmail.com

## 🙏 Agradecimientos

- Equipo de React por la excelente documentación
- Comunidad de Tailwind CSS
- Todos los colaboradores del proyecto

## 📞 Soporte

Si tienes alguna pregunta o problema:

1. Revisa la sección de [Issues](https://github.com/FrancoDeniroFloresChavez/Ejercicio2React/issues)
2. Crea un nuevo issue describiendo tu problema
3. Contacta al autor por email

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

Desarrollado con ❤️ por Franco Deniro Flores Chávez