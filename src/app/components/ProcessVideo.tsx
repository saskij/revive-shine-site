"use client";

import ScrollReveal from "./ScrollReveal";

export default function ProcessVideo() {
    return (
        <section className="section" id="process">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Process</div>
                    <div className="title">Proof it’s real work</div>
                    <p className="sub">Short clips perform very well: extraction pass, dirty water, final result. Videos are optional — add later.</p>
                </ScrollReveal>

                <div className="vidgrid">
                    <ScrollReveal className="vid">
                        <video controls playsInline preload="metadata" poster="/assets/images/process-01.webp">
                            <source src="/assets/images/process-01.mp4" type="video/mp4" />
                        </video>
                        <div className="vidcap">
                            <p className="h">Deep extraction pass</p>
                            <p className="d">Real results: removing embedded dirt from fabric.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="vid">
                        <video controls playsInline preload="metadata" poster="/assets/images/process-02.webp">
                            <source src="/assets/images/process-02.mp4" type="video/mp4" />
                        </video>
                        <div className="vidcap">
                            <p className="h">From dirty to fresh</p>
                            <p className="d">Deep extraction that brings fabric back to life.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
