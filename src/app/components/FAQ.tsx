"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function FAQ() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setActiveId(prev => (prev === id ? null : id));
    };

    return (
        <>
            <section className="section" id="faq">
                <div className="wrap">
                    <ScrollReveal>
                        <div className="kicker">FAQ</div>
                        <div className="title">Frequently Asked Questions</div>
                        <p className="sub">Quick answers to common questions about our service.</p>
                    </ScrollReveal>

                    <div className="grid">
                        <FAQItem
                            id="faq1"
                            question="How long does the drying process take?"
                            answer="Usually 4–8 hours depending on ventilation."
                            icon="/assets/images/faq-drying.webp"
                            isOpen={activeId === "faq1"}
                            onClick={() => toggle("faq1")}
                            stagger="stagger-1"
                        />

                        <FAQItem
                            id="faq2"
                            question="Are your cleaning products pet and kid-safe?"
                            answer="Yes, we use eco-friendly, non-toxic professional solutions."
                            icon="/assets/images/faq-safe.webp"
                            isOpen={activeId === "faq2"}
                            onClick={() => toggle("faq2")}
                            stagger="stagger-2"
                        />

                        <FAQItem
                            id="faq3"
                            question="Do I need to vacuum before you arrive?"
                            answer="It’s helpful but not required; we do a professional extraction."
                            icon="/assets/images/faq-vacuum.webp"
                            isOpen={activeId === "faq3"}
                            onClick={() => toggle("faq3")}
                            stagger="stagger-3"
                        />

                        <FAQItem
                            id="faq4"
                            question="Do you provide services in my city?"
                            answer="We are a mobile service and we come to you! We proudly serve Meridian, Boise, Eagle, Star, Kuna, Nampa, and Caldwell."
                            icon="/assets/images/faq-location.webp"
                            isOpen={activeId === "faq4"}
                            onClick={() => toggle("faq4")}
                        />

                        <FAQItem
                            id="faq5"
                            question="How do I get an accurate price estimate?"
                            answer="The easiest way is to use our Free Quote form. Just upload a few photos of your furniture or car interior, and we will send you a text with a precise estimate within 30 minutes."
                            icon="/assets/images/faq-estimate.webp"
                            isOpen={activeId === "faq5"}
                            onClick={() => toggle("faq5")}
                        />
                    </div>
                </div>
            </section>

            {/* GUARANTEE */}
            <section className="section" style={{ background: "linear-gradient(135deg, #161616 0%, #2a2a2a 100%)", color: "#fff", textAlign: "center" }}>
                <div className="wrap">
                    <ScrollReveal>
                        <div className="kicker" style={{ color: "var(--gold)" }}>Our Promise</div>
                        <div className="title" style={{ color: "#fff" }}>100% Satisfaction Guaranteed</div>
                        <p className="sub" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>
                            If you're not completely happy with the results, we'll come back and make it right—at no extra cost to you.
                        </p>
                        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛡️</div>
                        <Link className="btn primary" href="#quote" data-open-quote="General">Book with Confidence</Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}

function FAQItem({ id, question, answer, icon, isOpen, onClick, stagger }: any) {
    // Same structure as BenefitItem
    return (
        <ScrollReveal className={`benefit ${stagger || ""}`}>
            <div aria-expanded={isOpen} style={{ width: '100%' }}>
                <button type="button" className="head" aria-expanded={isOpen} onClick={onClick}>
                    <div className="iconbox"><img src={icon} alt={question} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" /></div>
                    <div className="btxt">
                        <p className="h">{question}</p>
                        <p className="d">{isOpen ? "" : "" /* We could hide description if we wanted */}</p>
                        {/* The original had 'd' often mimicking the answer summary, or separate. 
                 In the HTML, only 'd' was shown closed, then 'panel' shown open.
                 HTML:
                 p.h: How long...?
                 p.d: Usually 4-8 hours...
                 panel: Usually 4-8 hours...
                 Let's keep p.d for summary.
             */}
                        <p className="d">{answer}</p>
                    </div>
                    <div className="chev" style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</div>
                </button>
                <div className="panel" role="region" style={{ maxHeight: isOpen ? "200px" : "0px" }}>
                    <div className="inner">
                        <p>{answer}</p>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
