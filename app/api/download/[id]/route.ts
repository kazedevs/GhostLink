import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/admin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const isDownloadRequest = searchParams.get("file") === "true";
    
    // PREFETCH GUARD: Prevent browsers from consuming the one-time link in the background
    const isPrefetch = 
        req.headers.get("purpose") === "prefetch" || 
        req.headers.get("sec-purpose") === "prefetch" ||
        req.headers.get("sec-purpose") === "prefetch;prerender" ||
        req.headers.get("x-moz-prefetch") === "prefetch";

    if (isPrefetch) {
        return new Response(null, { status: 204 }); // Ignore prefetch
    }

    console.log(`[DOWNLOAD_API] Request for ID: ${id}, isDownload: ${isDownloadRequest}`);

    // Fetch Metadata
    const { data: file, error } = await supabaseAdmin
      .from("files")
      .select("*")
      .eq("id", id)
      .single();

    if (!file || error) {
      console.log(`[DOWNLOAD_API] File not found in DB: ${id}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // If it's just a metadata request
    if (!isDownloadRequest) {
      return NextResponse.json({
        originalName: file.original_name,
        id: file.id
      });
    }

    // If it's the actual download request
    console.log(`[GHOST_MODE] Serving and destroying file: ${id}`);

    // Download the file from Supabase Storage
    const { data, error: storageError } = await supabaseAdmin.storage
      .from("ghost-files")
      .download(file.storage_path);

    if (storageError || !data) {
      console.error(storageError);
      return NextResponse.json({ error: "Download failed" }, { status: 500 });
    }

    // CLEANUP: Delete from storage and DB immediately after getting the data locally
    await supabaseAdmin.storage.from("ghost-files").remove([file.storage_path]);
    await supabaseAdmin.from("files").delete().eq("id", id);

    // Return the file contents
    const safeName = encodeURIComponent(file.original_name);
    
    return new Response(data, {
      headers: {
        "Content-Disposition": `attachment; filename="${safeName}"; filename*=UTF-8''${safeName}`,
        "Content-Type": data.type || "application/octet-stream",
      },
    });

  } catch (err) {
    console.error("[DOWNLOAD_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}