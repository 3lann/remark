import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, hasPermission } from "@/lib/auth";
import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const idStr = formData.get("id")?.toString();
        const file = formData.get("image") as File;

        if (!idStr || !file || file.size === 0) {
            return NextResponse.json({ error: "Missing ID or file" }, { status: 400 });
        }

        const id = parseInt(idStr, 10);

        const ext = file.name.split('.').pop() || "png";
        const filename = `leader_${id}_${Date.now()}.${ext}`;

        const uploadDir = path.join(process.cwd(), "public", "uploads", "leaders");
        await fs.mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filepath, buffer);

        const host = req.headers.get('host') || "remark-agency.com";
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const imageUrl = `${protocol}://${host}/uploads/leaders/${filename}`;

        const { rows } = await pool.query(
            "UPDATE leadership_members SET image_url = $1 WHERE id = $2 RETURNING *",
            [imageUrl, id]
        );

        return NextResponse.json({ success: true, member: rows[0] });

    } catch (err) {
        console.error("Image upload error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
