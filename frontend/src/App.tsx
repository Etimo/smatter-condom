import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Feed from "./components/Feed";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="min-h-full">
        <Navbar />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white py-6 shadow sm:px-6">
              <Suspense fallback={<div>Loading...</div>}>
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
              </Suspense>
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
