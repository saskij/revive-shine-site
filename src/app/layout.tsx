import type { Metadata } from "next";
import "./globals.css";
import { LightboxProvider } from "./context/LightboxContext";

export const metadata: Metadata = {
    title: "Revive & Shine | Upholstery & Auto Interior Cleaning Boise, ID",
    description: "Professional deep extraction cleaning for couches, mattresses, and car interiors in Boise, Meridian, Nampa, and Caldwell. Eco-friendly, mobile service — we come to you!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Playfair+Display:wght@700;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <LightboxProvider>
                    {children}
                </LightboxProvider>
            </body>
        </html>
    );
}
