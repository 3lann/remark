import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, hasPermission } from "@/lib/auth";
import pool from "@/lib/db";

/* ─── GET: All roles can view applications ─── */
export async function GET(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows } = await pool.query(
            "SELECT * FROM applications ORDER BY created_at DESC"
        );
        return NextResponse.json({ applications: rows });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── PATCH: Manager + Super Admin can update status ─── */
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.role, "manager")) {
        return NextResponse.json({ error: "Forbidden — Viewer role cannot update applications" }, { status: 403 });
    }

    try {
        const { id, status, notes } = await req.json();

        const { rows } = await pool.query(
            "UPDATE applications SET status = $1, notes = $2 WHERE id = $3 RETURNING *",
            [status, notes || null, id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ application: rows[0] });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
