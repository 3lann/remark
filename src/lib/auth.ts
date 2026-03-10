import crypto from "crypto";
import pool from "@/lib/db";

const SESSION_SECRET =
    process.env.ADMIN_SESSION_SECRET || "change-me-in-production-abc123";
const PASSWORD_SALT =
    process.env.ADMIN_PASSWORD_SALT || "remark-careers-salt-2024";

export type AdminRole = "super_admin" | "manager" | "viewer";

export interface AdminUser {
    id: number;
    username: string;
    role: AdminRole;
    display_name: string;
    is_active: boolean;
    created_at: string;
}

export function hashPassword(password: string): string {
    return crypto
        .createHmac("sha256", PASSWORD_SALT)
        .update(password)
        .digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
    const computed = hashPassword(password);
    if (computed.length !== hash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
}

export async function verifyCredentials(
    username: string,
    password: string
): Promise<AdminUser | null> {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM admin_users WHERE username = $1 AND is_active = true",
            [username]
        );
        if (rows.length === 0) return null;

        const user = rows[0];
        if (!verifyPassword(password, user.password_hash)) return null;

        return {
            id: user.id,
            username: user.username,
            role: user.role as AdminRole,
            display_name: user.display_name,
            is_active: user.is_active,
            created_at: user.created_at,
        };
    } catch {
        return null;
    }
}

export function createSessionToken(username: string, role: AdminRole): string {
    const payload = {
        username,
        role,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000,
    };
    const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto
        .createHmac("sha256", SESSION_SECRET)
        .update(data)
        .digest("base64url");
    return `${data}.${signature}`;
}

export interface TokenPayload {
    username: string;
    role: AdminRole;
    iat: number;
    exp: number;
}

export function verifySessionToken(token: string): TokenPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 2) return null;
        const [data, signature] = parts;
        if (!data || !signature) return null;

        const expectedSignature = crypto
            .createHmac("sha256", SESSION_SECRET)
            .update(data)
            .digest("base64url");

        if (
            !crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(expectedSignature)
            )
        )
            return null;

        const payload = JSON.parse(
            Buffer.from(data, "base64url").toString()
        ) as TokenPayload;
        if (payload.exp < Date.now()) return null;
        if (!payload.role || !payload.username) return null;

        return payload;
    } catch {
        return null;
    }
}

/** Helper: extract role from request cookie */
export function getSessionFromRequest(req: { cookies: { get: (name: string) => { value: string } | undefined } }): TokenPayload | null {
    const token = req.cookies.get("admin_session")?.value;
    if (!token) return null;
    return verifySessionToken(token);
}

/** Check if role has at least the given permission level */
export function hasPermission(role: AdminRole, minRole: AdminRole): boolean {
    const hierarchy: Record<AdminRole, number> = {
        viewer: 0,
        manager: 1,
        super_admin: 2,
    };
    return hierarchy[role] >= hierarchy[minRole];
}
