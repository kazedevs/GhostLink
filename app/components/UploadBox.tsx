"use client";

import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { Upload, File, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import {formatSize} from '@/lib/utils';
import {MAX_FILE_SIZE} from '@/constants';


const UploadBox = () => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <section className="max-w-xl mx-auto px-4 pb-32">
            <div className="relative group">
                <div 
                    {...getRootProps()}
                    className={`
                        relative h-72 w-full border border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                        ${isDragActive 
                            ? "border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 shadow-2xl shadow-zinc-200/50 dark:shadow-none" 
                            : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm"
                        }
                    `}
                >
                    <input {...getInputProps()} />

                    {!file ? (
                        <div className="flex flex-col items-center space-y-4 text-center px-4">
                            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 transition-transform duration-500">
                                <Upload className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium tracking-tight">
                                    {isDragActive ? "Drop to upload" : "Drop a file to send securely"}
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                    Max size {formatSize(MAX_FILE_SIZE)} • P2P Encrypted
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full px-12 space-y-6">
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="p-3 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <File className="w-6 h-6 text-black dark:text-white" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 text-left overflow-hidden">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                                <button 
                                    onClick={removeFile}
                                    className="p-2 hover:bg-white dark:hover:bg-black rounded-full transition-colors z-20 cursor-pointer"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>

                            <button className="w-full h-14 bg-black dark:bg-white text-white dark:text-black font-medium text-sm tracking-wide rounded-full shadow-lg shadow-zinc-200 dark:shadow-none transition-transform active:scale-[0.98] cursor-pointer">
                                Share Ghostly
                            </button>
                        </div>
                    )}
                </div>

                {/* Features Bar */}
                <div className="mt-12 grid grid-cols-2 gap-8 text-left">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                            <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                            <span className="text-xs font-semibold tracking-tighter uppercase italic">AES-256 E2EE</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed font-light">
                            Files are encrypted client-side. We never store unencrypted data on servers.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                            <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                            <span className="text-xs font-semibold tracking-tighter uppercase italic">Self-Destructing</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed font-light">
                            Links expire automatically after a single download or 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ShareFileButton = () => {
    const [loading, setLoading] = useState(false);

}

export default UploadBox;