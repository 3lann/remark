import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (except /admin/login)
    if (
        pathname.startsWith("/admin") &&
        !pathname.startsWith("/admin/login")
    ) {
        const token = request.cookies.get("admin_session")?.value;

        // If no session cookie, redirect to login
        if (!token) {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Basic structure check — full crypto verification happens in API routes
        try {
            const parts = token.split(".");
            if (parts.length !== 2 || !parts[0] || !parts[1]) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }
            // Decode and check expiry
            const payload = JSON.parse(
                atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))
            );
            if (!payload.exp || payload.exp < Date.now()) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
