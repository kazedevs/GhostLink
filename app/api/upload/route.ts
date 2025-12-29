import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { MAX_FILE_SIZE } from "@/constants/index";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File too large" }, { status: 400 });
        }

        //generate random id
        const id = nanoid(20);
        const fileUrl = `${id}/${file.name}`;

        //upload to supabase storage
        const {error: uploadError} = await supabase.storage.from("ghost-files").upload(fileUrl, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
        });

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        const {error: dbError} = await supabase.from("ghost-files").insert({
            id,
            original_name: file.name,
            expires_at: expiresAt,
            storage_path: fileUrl,
            max_downloads: 1
        });

        if(dbError) {
            console.error("Error inserting file metadata:", dbError);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }

        return NextResponse.json({ id });

    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}