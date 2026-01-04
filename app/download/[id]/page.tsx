"use client";

import { useParams } from "next/navigation"; 
import { Nav } from "../../components/Nav";
import { Download, File } from "lucide-react";
import { useEffect, useState } from "react";
const DownloadPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [originalName, setOriginalName] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/download/${id}`);
        
        if (!response.ok) {
          if (response.status === 410 || response.status === 404) {
             setIsExpired(true);
          }
          throw new Error("Failed to fetch download details");
        }

        const data = await response.json();
        setOriginalName(data.originalName);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  return (
    <main className="min-h-screen selection:bg-zinc-800 flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              File Ready
            </h1>
            <p className="text-zinc-400">
              Your secure file transfer is ready for download.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center gap-6 relative overflow-hidden">
            <div className={`w-full flex flex-col items-center gap-6 transition-all duration-700 ${isExpired ? "blur-2xl opacity-20 scale-95 pointer-events-none" : ""}`}>
              <div className="flex items-center gap-4 w-full p-4 rounded-2xl bg-black/40 border border-zinc-800/50">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <File className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate font-mono">
                    {originalName || id}
                  </p>
                </div>
              </div>

              <div className="w-full space-y-3">
                {loading ? (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full h-14 bg-zinc-800 text-zinc-500 rounded-full font-medium cursor-wait"
                  >
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                    Decrypting...
                  </button>
                ) : (
                  <a
                    href={`/api/download/${id}?file=true`}
                    onClick={() => setTimeout(() => setIsExpired(true), 2000)}
                    className="flex items-center justify-center gap-2 w-full h-14 bg-white hover:bg-zinc-200 text-black rounded-full font-medium transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                  >
                    <Download className="w-5 h-5" />
                    Download File
                  </a>
                )}
              </div>
            </div>

            {isExpired && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="bg-white text-black px-8 py-3 rounded-full font-bold tracking-tight shadow-2xl animate-in zoom-in-50 duration-300">
                  DOWNLOADED OR EXPIRED
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DownloadPage;