import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import pool from "@/lib/db";

// Use crypt native in postgres for password change
export async function POST(req: NextRequest) {
    const session = getSessionFromRequest(req);

    // Check if logged in
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { current_password, new_password } = await req.json();

        if (!current_password || !new_password || new_password.length < 6) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        // Verify current password first by querying DB for this user 
        const { rows } = await pool.query(
            "SELECT id FROM admin_users WHERE username = $1 AND password = crypt($2, password)",
            [session.username, current_password]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
        }

        // Update the password
        await pool.query(
            "UPDATE admin_users SET password = crypt($1, gen_salt('bf')) WHERE username = $2",
            [new_password, session.username]
        );

        return NextResponse.json({ success: true, message: "Password updated successfully" });

    } catch (err) {
        console.error("Password update error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
