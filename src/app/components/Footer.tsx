"use client";

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-col">
                    <div className="footer-brand">
                        <img src="/assets/images/logo-new.webp" alt="Revive & Shine" className="footer-logo" loading="lazy" />
                        <span style={{ fontWeight: 900 }}>Revive & Shine</span>
                    </div>
                    <p className="footer-text">Professional upholstery and interior cleaning in Idaho.</p>
                    <p className="footer-area">Boise • Meridian • Nampa • Caldwell • Eagle</p>
                </div>
                <div className="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><Link href="#value">Upholstery Cleaning</Link></li>
                        <li><Link href="#work">Auto Interior Detail</Link></li>
                        <li><Link href="#value">Mattress Sanitizing</Link></li>
                        <li><Link href="#quote">Stain Removal</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="#top">Home</Link></li>
                        <li><Link href="#process">Our Process</Link></li>
                        <li><Link href="#reviews">Reviews</Link></li>
                        <li><Link href="#faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><Link href="tel:+15043279193">(504) 327-9193</Link></li>
                        <li><Link href="mailto:hello@rsmidaho.com">hello@rsmidaho.com</Link></li>
                        <li>Boise, ID 83701</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bot">
                <div>© {currentYear} Revive & Shine Mobile. All rights reserved.</div>
                <div className="socials">
                    <Link href="https://instagram.com/revive.shine.idaho" target="_blank" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </Link>
                    <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                        <i className="fa-brands fa-facebook"></i>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
