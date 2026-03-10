import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import pool from "@/lib/db";

/* ─── POST: Public — save contact form submission ─── */
export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();
        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        await pool.query(
            "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
            [name.trim(), email.trim(), message.trim()]
        );

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

/* ─── GET: Admin — list all submissions ─── */
export async function GET(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows } = await pool.query(
            "SELECT * FROM contact_submissions ORDER BY created_at DESC"
        );
        return NextResponse.json({ submissions: rows });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── PATCH: Admin — mark as read/unread ─── */
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, is_read } = await req.json();
        await pool.query("UPDATE contact_submissions SET is_read = $1 WHERE id = $2", [is_read, id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── DELETE: Super Admin — delete submission ─── */
export async function DELETE(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || session.role !== "super_admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        await pool.query("DELETE FROM contact_submissions WHERE id = $1", [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
