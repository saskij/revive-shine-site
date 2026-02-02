"use client";

import ScrollReveal from "./ScrollReveal";

export default function Reviews() {
    return (
        <section className="section" id="reviews">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Social proof</div>
                    <div className="title">People love the results</div>
                    <p className="sub">New business — first reviews are coming soon. Meanwhile, see real before/after results above.</p>
                </ScrollReveal>

                <div className="grid two">
                    <ScrollReveal className="card">
                        <div className="stars">★★★★★</div>
                        <blockquote>“The sofa looks brand new! I’m very impressed with the results. Highly recommend.”</blockquote>
                        <div className="who">— Jessica M.</div>
                    </ScrollReveal>

                    <ScrollReveal className="card">
                        <div className="stars">★★★★★</div>
                        <blockquote>“Excellent service — my car seats look amazing now. Thank you!”</blockquote>
                        <div className="who">— Daniel R.</div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
