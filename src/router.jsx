import { createBrowserRouter } from "react-router-dom";

// Auth pages
import Login from "./features/auth/pages/Login";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

// Blog pages
import BlogPage from "./features/blog/pages/BlogPage";
import PostDetailPage from "./features/blog/pages/PostDetailPage";

// Profile pages
import Profile from "./features/profiles/pages/Profile"; // 🔧 Ruta correcta

export const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <BlogPage /> },
            { path: "/blog", element: <BlogPage /> },
            { path: "blog/:id", element: <PostDetailPage /> },
            { path: "/profile", element: <Profile /> },
        ],
    },
]);