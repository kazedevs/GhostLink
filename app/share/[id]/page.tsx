"use client";

import { useParams, useRouter } from "next/navigation";
import QRCode from "react-qr-code"; 
import { Nav } from "../../components/Nav"; 
import { useState, useEffect } from "react";
import { Copy, Check, ArrowLeft } from "lucide-react";

const SharePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    }, []);

    const shareURL = `${baseUrl}/download/${id}`; 

    const handleCopy = () => {
        navigator.clipboard.writeText(shareURL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen selection:bg-zinc-800 flex flex-col">
            <Nav />
            <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20">
                <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
                            Ready to Share
                        </h1>
                        <p className="text-zinc-400">
                            Scan the QR code or copy the link below to share your file securely.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center gap-8">
                        <div className="bg-white p-4 rounded-xl shadow-lg">
                            <QRCode 
                                value={shareURL || "https://ghost-link-teal.vercel.app"} 
                                size={180}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            />
                        </div>

                        <div className="w-full space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase tracking-widest font-medium ml-1">
                                    Share Link
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        readOnly
                                        value={shareURL}
                                        className="flex-1 bg-black/50 border border-zinc-800 rounded-xl px-4 text-zinc-300 text-sm focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="p-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors active:scale-95 cursor-pointer"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={() => router.push("/")}
                            className="text-zinc-500 hover:text-white text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Send another file
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default SharePage;