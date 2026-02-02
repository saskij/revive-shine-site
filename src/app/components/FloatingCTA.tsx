"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FloatingCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    // If not visible, we hide the main button. 
    // In original CSS: .fab-hidden { transform: scale(0); opacity: 0; pointer-events: none; }
    // We can apply class .fab-hidden based on state.

    return (
        <div className={`fab ${!isVisible ? "fab-hidden" : ""}`} id="fab">
            <div
                className={`fab-menu ${isOpen ? "open" : ""}`}
                id="fabMenu"
                aria-hidden={!isOpen}
                style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(10px)',
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
            >
                <div className="row">
                    <Link className="primary" href="#quote" data-open-quote="General">Free Quote</Link>
                    <Link href="sms:+15043279193">Text</Link>
                    <Link href="tel:+15043279193">Call</Link>
                </div>
                <div className="fab-hint">
                    Tip: for the most accurate quote, text a photo after submitting.
                </div>
            </div>
            <button
                id="fabBtn"
                className={`fab-main ${isOpen ? "active" : ""}`}
                aria-label="Contact us"
                onClick={toggleMenu}
            >
                {isOpen ? "✕" : "💬 Contact us"}
            </button>
        </div>
    );
}
