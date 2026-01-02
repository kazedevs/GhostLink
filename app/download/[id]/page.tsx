"use client";

import { useParams } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Download, File} from "lucide-react";

const DownloadPage = () => {
  const { id } = useParams();
  const fileURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ghost-files/public/${id}`;

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

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center gap-6">
            
            <div className="flex items-center gap-4 w-full p-4 rounded-2xl bg-black/40 border border-zinc-800/50">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <File className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate font-mono">
                  {id}
                </p>
              </div>
            </div>

            <div className="w-full space-y-3">
              <a
                href={fileURL}
                download
                className="flex items-center justify-center gap-2 w-full h-14 bg-white hover:bg-zinc-200 text-black rounded-full font-medium transition-all active:scale-[0.98] shadow-lg shadow-white/5"
              >
                <Download className="w-5 h-5" />
                Download File
              </a>
            </div>
            <p className="text-center text-zinc-400 text-xs">Expires after one download</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DownloadPage;