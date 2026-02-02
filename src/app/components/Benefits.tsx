"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ChevronRight } from "lucide-react"; // Or use simple text › if preferred to match exactly

export default function Benefits() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setActiveId(prev => (prev === id ? null : id));
    };

    const isOpen = (id: string) => activeId === id;

    const getPanelStyle = (id: string) => {
        if (!isOpen(id)) return { maxHeight: "0px" };
        // In a real app we might measure scrollHeight, but for now we can rely on CSS transition 
        // or just set a large enough max-height if we want pure CSS transition on max-height.
        // However, the original JS used scrollHeight.
        // Let's use a rough estimate or a ref if needed. 
        // For simplicity, let's just toggling the class/aria-expanded and let CSS handle if possible, 
        // but React needs to set style for animation.
        // Actually, the original CSS uses `transition: max-height .28s ease`. 
        // We can just use an arbitrary large number or a ref.
        return { maxHeight: "500px" }; // Simplified for now
    };

    // Helper to render an item
    const RenderItem = ({ id, title, desc, icon, children, staggerClass }: any) => {
        const open = activeId === id;

        return (
            <ScrollReveal className={`benefit ${staggerClass}`} >
                <div id={id} aria-expanded={open} className="benefit-wrapper">
                    {/* We need to apply aria-expanded to the root .benefit-wrapper or similar to style the chevron? 
                 The original CSS had .benefit[aria-expanded="true"] .chev.
                 So we should wrap it or put the prop on the div.
              */}
                    {/* Actually, let's match the structure exactly: <div class="benefit" ...> */}
                </div>
            </ScrollReveal>
        );
    };

    // Re-writing loop for clarity
    return (
        <section className="section" id="benefits">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">What you get</div>
                    <div className="title">Clean, fast, and actually deep</div>
                    <p className="sub">Tap a benefit to see details — then request a quote in one click.</p>
                </ScrollReveal>

                <div className="grid">
                    {/* Item 1 */}
                    <BenefitItem
                        id="b1"
                        title="Clean & cozy finish"
                        desc="A refreshed look that feels comfortable again"
                        icon="/assets/images/clean-finish.webp"
                        isOpen={activeId === "b1"}
                        onClick={() => toggle("b1")}
                        stagger="stagger-1"
                    >
                        <p>Your furniture looks refreshed, clean, and feels comfortable again.</p>
                        <div className="panel-actions">
                            <Link className="primary" href="#quote" data-open-quote="Sofa quote">Get a quote for my sofa</Link>
                            <Link href="#work">See real results</Link>
                        </div>
                    </BenefitItem>

                    {/* Item 2 */}
                    <BenefitItem
                        id="b2"
                        title="Fast scheduling"
                        desc="Same-week availability + respectful timing"
                        icon="/assets/images/fast-scheduling.webp"
                        isOpen={activeId === "b2"}
                        onClick={() => toggle("b2")}
                        stagger="stagger-2"
                    >
                        <p>Same-week appointments available.</p>
                        <p>Evening &amp; weekend slots.</p>
                        <p>We respect your time.</p>
                        <div className="panel-actions">
                            <Link className="primary" href="#quote" data-open-quote="Scheduling">Check availability</Link>
                        </div>
                    </BenefitItem>

                    {/* Item 3 */}
                    <BenefitItem
                        id="b3"
                        title="Real extraction"
                        desc="Embedded dirt you can actually see"
                        icon="/assets/images/real-extraction.webp"
                        isOpen={activeId === "b3"}
                        onClick={() => toggle("b3")}
                        stagger="stagger-3"
                    >
                        <p>We remove embedded dirt you can actually see — not just surface cleaning.</p>
                        <div className="panel-actions">
                            <Link href="#process">See the process</Link>
                            <Link className="primary" href="#quote" data-open-quote="Extraction cleaning">Get a quote</Link>
                        </div>
                    </BenefitItem>

                    {/* Item 4 */}
                    <BenefitItem
                        id="b4"
                        title="Odor solutions"
                        desc="Pets, smoke, food smells"
                        icon="/assets/images/odor-solutions.webp"
                        isOpen={activeId === "b4"}
                        onClick={() => toggle("b4")}
                        stagger="stagger-4"
                    >
                        <p>Pet odors • Smoke • Food smells</p>
                        <div className="panel-actions">
                            <Link className="primary" href="#quote" data-open-quote="Odor treatment">Ask about odor treatment</Link>
                        </div>
                    </BenefitItem>

                </div>
            </div>
        </section>
    );
}

function BenefitItem({ id, title, desc, icon, isOpen, onClick, children, stagger }: any) {
    // We attach aria-expanded to the div so CSS selector .benefit[aria-expanded="true"] works
    return (
        <ScrollReveal className={`benefit ${stagger}`}>
            <div aria-expanded={isOpen} style={{ width: '100%' }}>
                <button
                    type="button"
                    className="head"
                    aria-expanded={isOpen}
                    onClick={onClick}
                >
                    <div className="iconbox"><img alt={title} src={icon} loading="lazy" /></div>
                    <div className="btxt">
                        <p className="h">{title}</p>
                        <p className="d">{desc}</p>
                    </div>
                    <div className="chev" style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</div>
                </button>
                <div
                    className="panel"
                    role="region"
                    style={{ maxHeight: isOpen ? "200px" : "0px" }} // transition handled by CSS class .panel
                >
                    <div className="inner">
                        {children}
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
