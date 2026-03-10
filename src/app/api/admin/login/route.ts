import { NextRequest, NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";
import crypto from "crypto";

// Hardcoded admin credentials (used when DB is not connected)
const FALLBACK_ADMIN = {
    username: "admin",
    passwordHash: crypto.createHmac("sha256", "remark-careers-salt-2024").update("15281153").digest("hex"),
    role: "super_admin" as const,
    display_name: "Admin",
};

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        // Try DB first, fall back to hardcoded credentials
        let user: { username: string; role: "super_admin" | "manager" | "viewer"; display_name: string } | null = null;

        try {
            const { verifyCredentials } = await import("@/lib/auth");
            const dbUser = await verifyCredentials(username, password);
            if (dbUser) user = dbUser;
        } catch {
            // DB not available — use fallback
        }

        // Fallback: check hardcoded admin credentials
        if (!user) {
            const inputHash = crypto.createHmac("sha256", "remark-careers-salt-2024").update(password).digest("hex");
            if (
                username === FALLBACK_ADMIN.username &&
                crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(FALLBACK_ADMIN.passwordHash))
            ) {
                user = {
                    username: FALLBACK_ADMIN.username,
                    role: FALLBACK_ADMIN.role,
                    display_name: FALLBACK_ADMIN.display_name,
                };
            }
        }

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = createSessionToken(user.username, user.role);
        const response = NextResponse.json({
            success: true,
            role: user.role,
            displayName: user.display_name,
            username: user.username,
        });

        response.cookies.set("admin_session", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
