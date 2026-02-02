import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Honeypot check
        const honeypot = formData.get("fi-honeypot");
        if (honeypot) {
            console.log("Spam detected (honeypot)");
            return NextResponse.json({ success: true }, { status: 200 }); // Silent success
        }

        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Missing Telegram env vars");
            return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
        }

        const name = formData.get("fi-sender-firstName") as string;
        const phone = formData.get("fi-sender-phone") as string;
        const message = formData.get("fi-text-message") as string;
        const files = formData.getAll("file") as File[];

        // 1. Send text message
        const textParams = new URLSearchParams({
            chat_id: chatId,
            text: `🔔 *New Lead*\n\n👤 *Name:* ${name}\n📞 *Phone:* \`${phone}\`\n💬 *Message:* ${message}`,
            parse_mode: "Markdown",
        });

        const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            body: textParams,
        });

        if (!msgRes.ok) {
            const err = await msgRes.text();
            console.error("Telegram Text Error:", err);
            throw new Error("Failed to send text");
        }

        // 2. Send photos if any
        if (files.length > 0) {
            for (const file of files) {
                if (file.size > 0) {
                    const photoData = new FormData();
                    photoData.append("chat_id", chatId);
                    photoData.append("photo", file);

                    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
                        method: "POST",
                        body: photoData,
                    });
                }
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
