import Feed from "./components/Feed";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white py-6 shadow sm:px-6">
              <Feed />
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </>
  );
};

export default App;
