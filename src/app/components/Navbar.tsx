"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    return (
        <header className="topbar">
            <div className="bar">
                <Link className="brandlink" href="#top" aria-label="Back to top">
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

                <div className="navchips">
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
            </div>
        </header>
    );
}
