import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, createSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const user = await verifyCredentials(username, password);
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
