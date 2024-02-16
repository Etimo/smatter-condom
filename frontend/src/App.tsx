import { Feed, Navbar, PostPost } from "./components";

const App = () => {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <Navbar />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Feed
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="lg:w-1/2">
              <PostPost />
            </div>
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Feed />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
