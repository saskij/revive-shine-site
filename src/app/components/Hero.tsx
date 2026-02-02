import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

async function getStrapiData() {
    try {
        // 2s timeout to avoid blocking page load if local strapi is down
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch("http://localhost:1337/api/homepage", {
            next: { revalidate: 60 }, // Cache for 1 min
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (error) {
        // Silently fail to fallback
        return null;
    }
}

export default async function Hero() {
    const strapiData = await getStrapiData();

    const title = strapiData?.Title || "Upholstery & Auto Interior Cleaning in Boise";
    const description = strapiData?.Description || "Deep extraction cleaning for upholstery and auto interiors. Remove embedded dirt, odors, and most stains. For the most accurate quote, send a photo.";

    return (
        <section className="hero" id="hero">
            <div className="wrap">
                <ScrollReveal className="pillrow">
                    <div className="pill">Mobile service — we come to you</div>
                    <div className="pill">Sofas • Mattresses • Car seats</div>
                    <div className="pill">Boise • Meridian • Nampa • Caldwell</div>
                </ScrollReveal>

                <ScrollReveal>
                    <h1 id="hero-title">{title}</h1>
                    <p id="hero-description">{description}</p>

                    <div className="hero-actions">
                        <Link className="btn primary" href="#quote" data-open-quote="Sofa quote">Get a free quote</Link>
                        <Link className="btn light" href="sms:+15043279193">Text us</Link>
                        <Link className="btn" href="tel:+15043279193">Call</Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
