import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { BlogProvider } from "./features/blog/context/BlogContext";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;