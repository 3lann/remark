import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, hasPermission } from "@/lib/auth";
import pool from "@/lib/db";

/* ─── GET: Public — returns active leadership members ─── */
export async function GET() {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM leadership_members WHERE is_active = true ORDER BY sort_order ASC"
        );
        return NextResponse.json({ members: rows });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── POST: Super Admin — add new member ─── */
export async function POST(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { name, name_ar, role, role_ar, years, bio, bio_ar, strengths, strengths_ar } = await req.json();
        if (!name || !role) {
            return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
        }

        // Get max sort_order
        const { rows: maxRows } = await pool.query("SELECT COALESCE(MAX(sort_order), -1) + 1 as next_order FROM leadership_members");
        const nextOrder = maxRows[0].next_order;

        const { rows } = await pool.query(
            `INSERT INTO leadership_members (name, name_ar, role, role_ar, years, bio, bio_ar, strengths, strengths_ar, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [name, name_ar || "", role, role_ar || "", years || "1", bio || "", bio_ar || "", strengths || [], strengths_ar || [], nextOrder]
        );

        return NextResponse.json({ member: rows[0] }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── PATCH: Super Admin — update member ─── */
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { id } = body;
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        // Toggle active
        if (typeof body.is_active === "boolean") {
            await pool.query("UPDATE leadership_members SET is_active = $1 WHERE id = $2", [body.is_active, id]);
            return NextResponse.json({ success: true });
        }

        // Full update
        const { rows } = await pool.query(
            `UPDATE leadership_members SET name=$1, name_ar=$2, role=$3, role_ar=$4, years=$5, bio=$6, bio_ar=$7, strengths=$8, strengths_ar=$9
             WHERE id=$10 RETURNING *`,
            [body.name, body.name_ar || "", body.role, body.role_ar || "", body.years || "1", body.bio || "", body.bio_ar || "", body.strengths || [], body.strengths_ar || [], id]
        );

        return NextResponse.json({ member: rows[0] });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── DELETE: Super Admin only ─── */
export async function DELETE(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        await pool.query("DELETE FROM leadership_members WHERE id = $1", [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
