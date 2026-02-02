"use client";

import { useLightbox } from "../context/LightboxContext";
import { useEffect } from "react";

export default function Lightbox() {
    const { isOpen, src, title, footer, closeLightbox } = useLightbox();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("lb-open");
        } else {
            document.body.classList.remove("lb-open");
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeLightbox]);

    if (!isOpen) return null;

    return (
        <div className={`lightbox ${isOpen ? "open" : ""}`} id="lightbox" aria-hidden="false">
            <div className="lb-bg" onClick={closeLightbox}></div>
            <div className="lb-card" role="dialog" aria-modal="true" aria-label="Photo preview">
                <div className="lb-head">
                    <div className="lb-title" id="lbTitle">{title}</div>
                    <button className="lb-x" type="button" onClick={closeLightbox}>✕</button>
                </div>
                {src && (
                    <img className="lb-img" id="lbImg" src={src} alt={title || "Preview"} />
                )}
                <div className="lb-foot" id="lbFoot">{footer}</div>
            </div>
        </div>
    );
}
