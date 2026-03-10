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

/* ─── PATCH: Manager + Super Admin OR n8n can update status ─── */
export async function PATCH(req: NextRequest) {
    const session = getSessionFromRequest(req);
    const apiKey = req.headers.get("x-api-key");
    const expectedKey = process.env.N8N_API_KEY || "remark-n8n-2026";

    // Validate either valid session (manager) OR n8n's API key
    if (!session && apiKey !== expectedKey) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session && !hasPermission(session.role, "manager")) {
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

/* ─── POST: n8n sends approved application here to be inserted into DB ─── */
export async function POST(req: NextRequest) {
    try {
        // Authenticate the request using x-api-key header
        const apiKey = req.headers.get("x-api-key");
        const expectedKey = process.env.N8N_API_KEY || "remark-n8n-2026"; // Default for safety

        if (apiKey !== expectedKey) {
            return NextResponse.json({ error: "Unauthorized: Invalid API Key" }, { status: 401 });
        }

        const body = await req.json();

        const {
            role,
            full_name,
            phone,
            email,
            city,
            years_experience,
            expected_salary,
            strongest_skill,
            portfolio_url,
            why_join,
            cv_url,
            category,
            level,
            ai_analysis,
            work_type
        } = body;

        // Insert directly into postgres
        const { rows } = await pool.query(
            `INSERT INTO applications(
                role, full_name, phone, email, city, years_experience, 
                expected_salary, strongest_skill, portfolio_url, why_join, cv_url, 
                status, category, level, ai_analysis, work_type
             ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', $12, $13, $14, $15) RETURNING *`,
            [
                role || "",
                full_name || "",
                phone || "",
                email || "",
                city || "",
                parseInt(years_experience, 10) || 0,
                expected_salary || "",
                strongest_skill || "",
                portfolio_url || "",
                why_join || "",
                cv_url || "",
                category || null,
                level || null,
                ai_analysis || null,
                work_type || null
            ]
        );

        return NextResponse.json({ success: true, application: rows[0] }, { status: 201 });
    } catch (err) {
        console.error("DB insert error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
