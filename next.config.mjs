/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure we don't have strict mode issues, though usually true is fine.
    reactStrictMode: true,
    // Explicitly allow images from local if needed, or external.
    images: {
        unoptimized: true, // For simple usage without optimization costs/configuration if using external hosting
    },
    // Ensure we output standalone for better Vercel handling if needed (default is usually fine)
};

export default nextConfig;
