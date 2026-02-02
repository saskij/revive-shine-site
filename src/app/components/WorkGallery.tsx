"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { useLightbox } from "../context/LightboxContext";

export default function WorkGallery() {
    const { openLightbox } = useLightbox();

    return (
        <section className="section" id="work">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Real results</div>
                    <div className="title">Before / After examples</div>
                    <p className="sub">Tap any photo to zoom. Add your best 3–6 cases here for maximum trust.</p>
                </ScrollReveal>

                <div className="work-grid">
                    {/* Case 1 */}
                    <ScrollReveal className="case stagger-1">
                        <div className="case-head">
                            <p className="case-title">Mattress — refresh &amp; sanitize</p>
                            <div className="case-tag">Mattress</div>
                        </div>

                        <div className="ba">
                            <div className="shot" onClick={() => openLightbox("/assets/images/price-mattress-01.webp", "Mattress — BEFORE")}>
                                <span className="badge">Before</span>
                                <img src="/assets/images/price-mattress-01.webp" alt="Dirty mattress before cleaning process" loading="lazy" />
                            </div>
                            <div className="shot" onClick={() => openLightbox("/assets/images/price-mattress-02.webp", "Mattress — AFTER")}>
                                <span className="badge">After</span>
                                <img src="/assets/images/price-mattress-02.webp" alt="Clean sanitized mattress after deep extraction" loading="lazy" />
                            </div>
                        </div>

                        <p className="case-desc">Odors + embedded dirt removal for a cleaner sleeping surface.</p>

                        <div className="case-actions">
                            <Link className="primary" href="#quote" data-open-quote="General">Get a free quote</Link>
                            <Link href="#quote" data-open-quote="Odor treatment">Ask about odor treatment</Link>
                        </div>
                    </ScrollReveal>

                    {/* Case 2 */}
                    <ScrollReveal className="case stagger-2">
                        <div className="case-head">
                            <p className="case-title">Sofa — stain removal</p>
                            <div className="case-tag">Upholstery</div>
                        </div>

                        <div className="ba">
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-sofa-01-before.webp", "Sofa — BEFORE")}>
                                <span className="badge">Before</span>
                                <img src="/assets/images/ba-sofa-01-before.webp" alt="Sofa before" loading="lazy" />
                            </div>
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-sofa-01-after.webp", "Sofa — AFTER")}>
                                <span className="badge">After</span>
                                <img src="/assets/images/ba-sofa-01-after.webp" alt="Sofa after" loading="lazy" />
                            </div>
                        </div>

                        <p className="case-desc">Deep clean + extraction for a fresh, even finish.</p>

                        <div className="case-actions">
                            <Link className="primary" href="#quote" data-open-quote="General">Get a free quote</Link>
                            <Link href="#quote" data-open-quote="Odor treatment">Ask about odor treatment</Link>
                        </div>
                    </ScrollReveal>

                    {/* Case 3 */}
                    <ScrollReveal className="case stagger-3">
                        <div className="case-head">
                            <p className="case-title">Car seats — interior deep clean</p>
                            <div className="case-tag">Auto</div>
                        </div>

                        <div className="ba">
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-auto-01-before.webp", "Car seats — BEFORE")}>
                                <span className="badge">Before</span>
                                <img src="/assets/images/ba-auto-01-before.webp" alt="Dirty car seats before professional extraction cleaning" loading="lazy" />
                            </div>
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-auto-01-after.webp", "Car seats — AFTER")}>
                                <span className="badge">After</span>
                                <img src="/assets/images/ba-auto-01-after.webp" alt="Clean car seats after deep interior detailing" loading="lazy" />
                            </div>
                        </div>

                        <p className="case-desc">Extracted grime from fabric/leather, finished with a clean, even look.</p>

                        <div className="case-actions">
                            <Link className="primary" href="#quote" data-open-quote="General">Get a quote for my car</Link>
                            <Link href="#process">Watch the process</Link>
                        </div>
                    </ScrollReveal>

                    {/* Case 4 */}
                    <ScrollReveal className="case stagger-4">
                        <div className="case-head">
                            <p className="case-title">Dining chairs — refresh set</p>
                            <div className="case-tag">Upholstery</div>
                        </div>

                        <div className="ba">
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-chairs-01-before.webp", "Chairs — BEFORE")}>
                                <span className="badge">Before</span>
                                <img src="/assets/images/ba-chairs-01-before.webp" alt="Dining chairs with stains before cleaning service" loading="lazy" />
                            </div>
                            <div className="shot" onClick={() => openLightbox("/assets/images/ba-chairs-01-after.webp", "Chairs — AFTER")}>
                                <span className="badge">After</span>
                                <img src="/assets/images/ba-chairs-01-after.webp" alt="Refreshed dining chairs after upholstery cleaning" loading="lazy" />
                            </div>
                        </div>

                        <p className="case-desc">Quick turnaround, noticeable freshness, great for everyday use.</p>

                        <div className="case-actions">
                            <Link className="primary" href="#quote" data-open-quote="General">Get a free quote</Link>
                            <Link href="#quote" data-open-quote="Scheduling">Check availability</Link>
                        </div>
                    </ScrollReveal>

                </div>

                <ScrollReveal className="igcard">
                    <div className="left">
                        <div className="t">More results on Instagram</div>
                        <div className="s">@revive.shine.idaho — before/after reels &amp; weekly jobs</div>
                    </div>
                    <a href="https://www.instagram.com/revive.shine.idaho?igsh=YWRhZjNtY292M3Vx&utm_source=qr" target="_blank" rel="noopener">Open Instagram</a>
                </ScrollReveal>
            </div>
        </section>
    );
}
