"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const closeMenu = () => setMenuOpen(false);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header className="topbar">
                <div className="bar">
                    <Link className="brandlink" href="#top" aria-label="Back to top" onClick={handleLogoClick}>
                        <span className="logo">
                            <img
                                src="/assets/images/logo-new.webp"
                                alt="Revive & Shine logo"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                        target.parentElement.classList.add('noimg');
                                        target.parentElement.textContent = 'R';
                                    }
                                }}
                            />
                        </span>

                        <span className="brandtext">
                            <span className="full">Revive &amp; Shine</span>
                            <span className="short">R&amp;S</span>
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="navchips desktop-nav">
                        <Link className="chip" href="#benefits">Benefits</Link>
                        <Link className="chip" href="#value">Pricing</Link>
                        <Link className="chip" href="#work">Results</Link>
                        <Link className="chip" href="#process">Process</Link>
                        <Link className="chip" href="#reviews">Reviews</Link>
                        <Link className="chip" href="#faq">FAQ</Link>
                        <Link
                            className="chip primary"
                            href="#quote"
                            data-open-quote="General"
                            id="navFreeQuote"
                        >
                            Free Quote
                        </Link>
                    </div>

                    {/* Mobile burger button */}
                    <button
                        className={`burger-btn ${menuOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <>
                    <div className="mobile-menu-overlay" onClick={closeMenu}></div>
                    <nav className="mobile-menu">
                        <div className="mobile-menu-inner">
                            <Link className="mobile-menu-item" href="#benefits" onClick={closeMenu}>
                                <span className="mobile-menu-icon">✨</span>
                                Benefits
                            </Link>
                            <Link className="mobile-menu-item" href="#value" onClick={closeMenu}>
                                <span className="mobile-menu-icon">💰</span>
                                Pricing
                            </Link>
                            <Link className="mobile-menu-item" href="#work" onClick={closeMenu}>
                                <span className="mobile-menu-icon">🖼️</span>
                                Results
                            </Link>
                            <Link className="mobile-menu-item" href="#process" onClick={closeMenu}>
                                <span className="mobile-menu-icon">⚙️</span>
                                Process
                            </Link>
                            <Link className="mobile-menu-item" href="#reviews" onClick={closeMenu}>
                                <span className="mobile-menu-icon">⭐</span>
                                Reviews
                            </Link>
                            <Link className="mobile-menu-item" href="#faq" onClick={closeMenu}>
                                <span className="mobile-menu-icon">❓</span>
                                FAQ
                            </Link>
                            <Link
                                className="mobile-menu-item primary"
                                href="#quote"
                                onClick={closeMenu}
                                data-open-quote="General"
                            >
                                <span className="mobile-menu-icon">📝</span>
                                Get Free Quote
                            </Link>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
}
