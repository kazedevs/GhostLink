"use client";

import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import {formatSize} from '@/lib/utils';
import {MAX_FILE_SIZE} from '@/constants';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const UploadBox = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const router = useRouter();

    const processUpload = async (fileToUpload: File) => {
        if (!fileToUpload || uploading) return;

        setUploading(true);
        setProgress(0);
        setUploadedFileName(null);

        try {
            const fileExt = fileToUpload.name.split('.').pop();
            const fileName = `${nanoid()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { data, error } = await supabase.storage
                .from('ghost-files')
                .upload(filePath, fileToUpload);

            if (error) throw error;

            console.log("Upload successful:", data);
            setProgress(100);
            setUploadedFileName(fileName);
        } catch (error: any) {
            console.error("Upload failed:", error);
            setUploading(false);
            setProgress(0);
        } finally {
            setUploading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setUploadedFileName(null);
            setTimeout(() => {
                processUpload(selectedFile);
            }, 100);
        }
    }, [uploading]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (uploading) return;
        setFile(null);
        setProgress(0);
        setUploadedFileName(null);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (uploadedFileName) {
            router.push(`/share/${uploadedFileName}`);
        } else if (file && !uploading) {
            processUpload(file);
        }
    };

    return (
        <section className="max-w-xl mx-auto px-4 pb-32">
            <div className="relative group">
                <div 
                    {...getRootProps()}
                    className={`
                        relative h-72 w-full border border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300
                        ${isDragActive 
                            ? "border-white bg-zinc-900 shadow-none" 
                            : "border-zinc-800 bg-transparent shadow-sm"
                        }
                        ${!uploading && "cursor-pointer hover:border-zinc-600"}
                    `}
                >
                    <input {...getInputProps()} />

                    {!file ? (
                        <div className="flex flex-col items-center space-y-4 text-center px-4">
                            <div className="p-4 rounded-full bg-zinc-900 transition-transform duration-500">
                                <Upload className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-100 font-medium tracking-tight">
                                    {isDragActive ? "Drop to upload" : "Drop a file to send securely"}
                                </p>
                                <p className="text-zinc-400 text-sm">
                                    Max size {formatSize(MAX_FILE_SIZE)} • P2P Encrypted
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full px-12 space-y-6">
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                                <div className="p-3 rounded-xl bg-black border border-zinc-800 shadow-sm">
                                    <File className="w-6 h-6 text-white" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 text-left overflow-hidden space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-zinc-100 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
                                            {progress === 100 ? "Uploaded" : (uploading ? "Uploading..." : formatSize(file.size))}
                                        </p>
                                    </div>
                                    {uploading && progress < 100 && (
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-white animate-pulse w-full"
                                            />
                                        </div>
                                    )}
                                    {progress === 100 && (
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                             <div className="h-full bg-green-500 w-full" />
                                        </div>
                                    )}
                                </div>
                                {!uploading && (
                                    <button 
                                        onClick={removeFile}
                                        className="p-2 hover:bg-black rounded-full transition-colors z-20 cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                )}
                            </div>

                            <button 
                                onClick={handleShare}
                                disabled={uploading}
                                className={`
                                    w-full h-14 font-medium text-sm tracking-wide rounded-full shadow-none transition-all active:scale-[0.98]
                                    ${uploading 
                                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                                        : "bg-white text-black cursor-pointer hover:bg-zinc-200"
                                    }
                                `}
                            >
                                {uploading ? "Encrypting & Uploading..." : (uploadedFileName ? "Share Ghostly" : "Retry Upload")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};


export default UploadBox;