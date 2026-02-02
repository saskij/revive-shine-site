"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { useLightbox } from "../context/LightboxContext";

export default function PriceGrid() {
    const { openLightbox } = useLightbox();

    const handlePreview = (src: string, title: string, foot: string = "Tap outside to close.") => {
        openLightbox(src, title, foot);
    };

    return (
        <section className="section" id="value">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Value</div>
                    <div className="title">Price guide</div>
                    <p className="sub">
                        Transparent starting ranges to help you estimate. Final price depends on size, fabric, stains, and access.
                        For the most accurate quote — send a photo.
                    </p>
                </ScrollReveal>

                <div className="price-grid" id="price-grid">
                    {/* COUCH */}
                    <ScrollReveal className="price-card stagger-1">
                        <button
                            className="price-media"
                            type="button"
                            aria-label="Open price guide for couch cleaning"
                            onClick={() => handlePreview("/assets/images/price-couch.webp", "Couches — price guide")}
                        >
                            <img src="/assets/images/price-couch.webp" alt="Transparent price guide for couch and sofa cleaning in Boise" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Couch">
                            <div className="price-h">Couches</div>
                            <div className="price-d">Tap to request a quote</div>
                        </Link>
                    </ScrollReveal>

                    {/* MATTRESS */}
                    <ScrollReveal className="price-card stagger-2">
                        <button
                            className="price-media"
                            type="button"
                            aria-label="Open price guide for mattress cleaning"
                            onClick={() => handlePreview("/assets/images/price-mattress.webp", "Mattresses & beds — price guide")}
                        >
                            <img src="/assets/images/price-mattress.webp" alt="Professional mattress and bed cleaning price guide in Meridian" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Mattress">
                            <div className="price-h">Mattresses &amp; beds</div>
                            <div className="price-d">Tap to request a quote</div>
                        </Link>
                    </ScrollReveal>

                    {/* CHAIRS */}
                    <ScrollReveal className="price-card stagger-3">
                        <button
                            className="price-media"
                            type="button"
                            aria-label="Open price guide for chair cleaning"
                            onClick={() => handlePreview("/assets/images/price-chairs.webp", "Chairs — price guide")}
                        >
                            <img src="/assets/images/price-chairs.webp" alt="Expert upholstery cleaning for chairs and armchairs in Nampa" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Chairs">
                            <div className="price-h">Chairs</div>
                            <div className="price-d">Tap to request a quote</div>
                        </Link>
                    </ScrollReveal>

                    {/* CARPET */}
                    <ScrollReveal className="price-card">
                        <button
                            className="price-media"
                            type="button"
                            aria-label="Open price guide for carpet cleaning"
                            onClick={() => handlePreview("/assets/images/price-carpet.webp", "Carpets & rugs — price guide")}
                        >
                            <img src="/assets/images/price-carpet.webp" alt="Affordable carpet and rug cleaning prices in Boise area" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Carpet">
                            <div className="price-h">Carpets &amp; rugs</div>
                            <div className="price-d">Rooms, stairs, per sq ft</div>
                        </Link>
                    </ScrollReveal>

                    {/* CAR INTERIOR */}
                    <ScrollReveal className="price-card">
                        <button
                            className="price-media"
                            type="button"
                            aria-label="Open price guide for car interior cleaning"
                            onClick={() => handlePreview("/assets/images/price-car.webp", "Car interiors — price guide")}
                        >
                            <img src="/assets/images/price-car.webp" alt="Auto interior and car seat deep cleaning price guide" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Car interior">
                            <div className="price-h">Car interiors</div>
                            <div className="price-d">Seats, carpets, panels</div>
                        </Link>
                    </ScrollReveal>

                    {/* ADD-ONS */}
                    <ScrollReveal className="price-card">
                        <button
                            className="price-media"
                            type="button"
                            onClick={() => handlePreview("/assets/images/price-addons.webp", "Add-ons — price guide")}
                        >
                            <img src="/assets/images/price-addons.webp" alt="Add-ons price guide" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Add-ons">
                            <div className="price-h">Add-ons</div>
                            <div className="price-d">Pet hair, odors, fast drying</div>
                        </Link>
                    </ScrollReveal>

                    {/* DISCOUNTS */}
                    <ScrollReveal className="price-card">
                        <button
                            className="price-media"
                            type="button"
                            onClick={() => handlePreview("/assets/images/price-discounts.webp", "Discounts — price guide")}
                        >
                            <img src="/assets/images/price-discounts.webp" alt="Discounts price guide" loading="lazy" />
                        </button>

                        <Link className="price-cap" href="#quote" data-open-quote="Price guide — Discounts">
                            <div className="price-h">Discounts</div>
                            <div className="price-d">Ask to apply it</div>
                        </Link>
                    </ScrollReveal>
                </div>

                <ScrollReveal className="price-note">
                    <strong>Note:</strong> These are typical ranges. Heavy stains, pet hair, strong odors, or large-sectionals may change the price.
                    We’ll confirm after a photo and a few questions.
                </ScrollReveal>
            </div>
        </section>
    );
}
