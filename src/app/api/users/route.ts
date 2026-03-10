import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, hasPermission, hashPassword } from "@/lib/auth";
import pool from "@/lib/db";

/* ─── GET: List all admin users (Super Admin only) ─── */
export async function GET(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check for "me" query — any authenticated user can get their own info
    const { searchParams } = new URL(req.url);
    if (searchParams.get("me") === "true") {
        try {
            const { rows } = await pool.query(
                "SELECT id, username, role, display_name, is_active, created_at FROM admin_users WHERE username = $1",
                [session.username]
            );
            if (rows.length === 0) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            return NextResponse.json({ user: rows[0] });
        } catch {
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
    }

    // Full user list — Super Admin only
    if (!hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { rows } = await pool.query(
            "SELECT id, username, role, display_name, is_active, created_at FROM admin_users ORDER BY created_at ASC"
        );
        return NextResponse.json({ users: rows });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── POST: Create new admin user (Super Admin only) ─── */
export async function POST(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { username, password, role, displayName } = await req.json();

        if (!username || !password || !role || !displayName) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (!["super_admin", "manager", "viewer"].includes(role)) {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        const passwordHash = hashPassword(password);

        const { rows } = await pool.query(
            "INSERT INTO admin_users (username, password_hash, role, display_name) VALUES ($1, $2, $3, $4) RETURNING id, username, role, display_name, is_active, created_at",
            [username.toLowerCase().trim(), passwordHash, role, displayName.trim()]
        );

        return NextResponse.json({ user: rows[0] }, { status: 201 });
    } catch (err: any) {
        if (err?.code === "23505") {
            return NextResponse.json({ error: "Username already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── PATCH: Update admin user (Super Admin only) ─── */
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { id, role, displayName, password, isActive } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // Build dynamic update
        const updates: string[] = [];
        const values: any[] = [];
        let paramIdx = 1;

        if (role && ["super_admin", "manager", "viewer"].includes(role)) {
            updates.push(`role = $${paramIdx++}`);
            values.push(role);
        }
        if (displayName) {
            updates.push(`display_name = $${paramIdx++}`);
            values.push(displayName.trim());
        }
        if (password && password.length >= 6) {
            updates.push(`password_hash = $${paramIdx++}`);
            values.push(hashPassword(password));
        }
        if (typeof isActive === "boolean") {
            updates.push(`is_active = $${paramIdx++}`);
            values.push(isActive);
        }

        if (updates.length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        values.push(id);
        const { rows } = await pool.query(
            `UPDATE admin_users SET ${updates.join(", ")} WHERE id = $${paramIdx} RETURNING id, username, role, display_name, is_active, created_at`,
            values
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: rows[0] });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

/* ─── DELETE: Remove admin user (Super Admin only) ─── */
export async function DELETE(req: NextRequest) {
    const session = getSessionFromRequest(req);
    if (!session || !hasPermission(session.role, "super_admin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // Prevent self-deletion
        const { rows: check } = await pool.query("SELECT username FROM admin_users WHERE id = $1", [id]);
        if (check.length > 0 && check[0].username === session.username) {
            return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
        }

        const { rowCount } = await pool.query("DELETE FROM admin_users WHERE id = $1", [id]);

        if (rowCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
