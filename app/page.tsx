import { Hero } from "./components/Hero";
import UploadBox from "./components/UploadBox";
import { Nav } from "./components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-zinc-800">
      <Nav />
      <Hero />
      <UploadBox />
    </main>
  );
}


