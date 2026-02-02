"use client";

import ScrollReveal from "./ScrollReveal";

export default function Map() {
    return (
        <section className="section" id="service-area" style={{ paddingBottom: 0 }}>
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Locations</div>
                    <div className="title">Our Service Area</div>
                    <p className="sub">We bring our mobile deep cleaning service to you across the Treasure Valley.</p>
                </ScrollReveal>

                <ScrollReveal
                    style={{
                        marginTop: "24px",
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: "1px solid rgba(0,0,0,.1)",
                        lineHeight: 0
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d184512.0!2d-116.39!3d43.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1706606000000!5m2!1sen!2sus"
                        width="100%"
                        height="400"
                        style={{ border: 0, filter: "contrast(1.1) brightness(1.05)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </ScrollReveal>

                <ScrollReveal className="pillrow" style={{ marginTop: "20px", justifyContent: "center" }}>
                    <div className="pill">Boise</div>
                    <div className="pill">Meridian</div>
                    <div className="pill">Nampa</div>
                    <div className="pill">Caldwell</div>
                    <div className="pill">Eagle</div>
                </ScrollReveal>
            </div>
        </section>
    );
}
