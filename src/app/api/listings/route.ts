import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, hasPermission } from "@/lib/auth";
import pool from "@/lib/db";

// GET — public endpoint, returns active listings
export async function GET() {
    try {
        const { rows } = await pool.query(
            "SELECT id, title, description, tags, is_active FROM job_listings ORDER BY sort_order ASC, created_at ASC"
        );
        return NextResponse.json({ listings: rows });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}

// POST — admin only, create a new listing
export async function POST(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "manager")) {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    try {
        const { id, title, description, tags } = await req.json();

        if (!id || !title || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const slug = id
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const { rows } = await pool.query(
            `INSERT INTO job_listings (id, title, description, tags)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [slug, title, description, JSON.stringify(tags || [])]
        );

        return NextResponse.json({ listing: rows[0] });
    } catch (err: unknown) {
        if (
            err instanceof Error &&
            err.message.includes("duplicate key")
        ) {
            return NextResponse.json(
                { error: "A listing with this ID already exists" },
                { status: 409 }
            );
        }
        console.error("DB error:", err);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}

// PATCH — admin only, toggle active/inactive or update
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "manager")) {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    try {
        const { id, is_active, title, description, tags } =
            await req.json();

        if (title !== undefined) {
            const { rows } = await pool.query(
                `UPDATE job_listings SET title=$1, description=$2, tags=$3 WHERE id=$4 RETURNING *`,
                [
                    title,
                    description,
                    JSON.stringify(tags || []),
                    id,
                ]
            );
            return NextResponse.json({ listing: rows[0] });
        }

        const { rows } = await pool.query(
            "UPDATE job_listings SET is_active=$1 WHERE id=$2 RETURNING *",
            [is_active, id]
        );

        return NextResponse.json({ listing: rows[0] });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}

// DELETE — admin only
export async function DELETE(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "manager")) {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    try {
        const { id } = await req.json();
        await pool.query("DELETE FROM job_listings WHERE id=$1", [
            id,
        ]);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}
