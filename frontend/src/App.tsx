import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Feed from "./components/Feed";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Register from "./Register";
import { useUserStore } from "./user-store";

const publicRoutes = ["/login", "/register"];

const App = () => {
  const location = useLocation();
  const user = useUserStore();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!publicRoutes.includes(location.pathname) && (
        <div className="min-h-full">
          <Navbar />
          <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white py-6 shadow sm:px-6">
                {user.info?.username}
                <Routes>
                  <Route path="/" element={<Navigate to="/feed" />} />
                  <Route
                    path="/feed"
                    element={
                      <PrivateRoute>
                        <Feed />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<>Not found!</>} />
                </Routes>
              </div>
            </div>
          </main>
          <Toaster />
        </div>
      )}
    </Suspense>
  );
};

export default App;
