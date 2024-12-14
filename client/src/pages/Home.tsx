import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main data-theme="light" className="flex w-full h-screen bg-base-100">
      <Navbar />
      <div className="flex w-full h-screen">
        <h1 className="text-base-content">Home page</h1>
      </div>
    </main>
  );
}
