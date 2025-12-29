import { Hero } from "./components/Hero";
import UploadBox from "./components/UploadBox";
import { Nav } from "./components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Nav />
      <Hero />
      <UploadBox />
      <footer className="py-20 px-4 text-center text-zinc-400 text-[11px] uppercase tracking-[0.2em] font-light">
        <p>&copy; {new Date().getFullYear()} GhostLink made by Kaze</p>
      </footer>
    </main>
  );
}


