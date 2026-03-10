import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Remove deprecated config block

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const webhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
        }

        // 1. Process FormData
        const payload: Record<string, string> = { source: "careers-app-frontend" };
        let cvUrl = "";

        for (const [key, value] of formData.entries()) {
            if (key === "cv" && typeof value !== "string") {
                // It's a file
                const file = value as File;
                if (file.size > 0) {
                    const ext = file.name.split('.').pop();
                    const sanitizedName = formData.get("full_name")?.toString().replace(/\s+/g, '_') || "CV";
                    const filename = `${Date.now()}_${sanitizedName}.${ext}`;

                    // Set upload directory to public/uploads
                    const uploadDir = path.join(process.cwd(), "public", "uploads");

                    // Create directory if it doesn't exist
                    await fs.mkdir(uploadDir, { recursive: true });

                    // Write file to disk
                    const filepath = path.join(uploadDir, filename);
                    const buffer = Buffer.from(await file.arrayBuffer());
                    await fs.writeFile(filepath, buffer);

                    // Generate absolute URL (fallback to localhost in dev)
                    const host = req.headers.get('host') || "remark-agency.com";
                    const protocol = host.includes('localhost') ? 'http' : 'https';
                    cvUrl = `${protocol}://${host}/uploads/${filename}`;
                }
            } else {
                payload[key] = value.toString();
            }
        }

        payload.cv_url = cvUrl;

        // 2. Send JSON payload to n8n (so n8n gets standard text fields + the file link)
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("n8n webhook error:", response.status, await response.text());
            return NextResponse.json({ error: "Webhook delivery failed" }, { status: 502 });
        }

        return NextResponse.json({ success: true, message: "Sent to n8n as JSON with cv_url" });
    } catch (err) {
        console.error("notify-n8n error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
