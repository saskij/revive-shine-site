"use client";

import ScrollReveal from "./ScrollReveal";

export default function ProcessSteps() {
    return (
        <section className="section" id="how-it-works">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">How it works</div>
                    <div className="title">Our 3-step deep clean</div>
                    <p className="sub">We follow a proven method to ensure your furniture looks and feels its best.</p>
                </ScrollReveal>

                <div className="grid three-cols">
                    <ScrollReveal className="card stagger-1">
                        <div className="iconbox"><img src="/assets/images/step-assessment.webp" alt="Assessment" loading="lazy" /></div>
                        <p className="h" style={{ fontWeight: 950, margin: "12px 0 6px" }}>1. Assessment</p>
                        <p className="d" style={{ fontSize: "14px", color: "var(--muted)" }}>We inspect the fabric, identify stains, and choose the safest, most effective cleaning agent.</p>
                    </ScrollReveal>

                    <ScrollReveal className="card stagger-2">
                        <div className="iconbox"><img src="/assets/images/step-extraction.webp" alt="Deep Extraction" loading="lazy" /></div>
                        <p className="h" style={{ fontWeight: 950, margin: "12px 0 6px" }}>2. Deep Extraction</p>
                        <p className="d" style={{ fontSize: "14px", color: "var(--muted)" }}>Professional-grade hot water extraction pulls embedded dirt and allergens from deep within the fibers.</p>
                    </ScrollReveal>

                    <ScrollReveal className="card stagger-3">
                        <div className="iconbox"><img src="/assets/images/step-final.webp" alt="Final Touch" loading="lazy" /></div>
                        <p className="h" style={{ fontWeight: 950, margin: "12px 0 6px" }}>3. Final Touch</p>
                        <p className="d" style={{ fontSize: "14px", color: "var(--muted)" }}>We groom the fabric, treat any stubborn spots, and ensure everything is set for quick drying.</p>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
