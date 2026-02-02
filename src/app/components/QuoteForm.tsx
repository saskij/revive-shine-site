"use client";

import { useState, useRef, FormEvent } from "react";
import Compressor from "compressorjs";
import ScrollReveal from "./ScrollReveal";
import confetti from "canvas-confetti";

export default function QuoteForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [btnText, setBtnText] = useState("Send request");
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    // To store actual files to send (compressed)
    const filesRef = useRef<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) return;

        const newFiles = Array.from(fileList);

        newFiles.forEach(file => {
            // Create thumbnail immediately
            const url = URL.createObjectURL(file);
            setThumbnails(prev => [...prev, url]);

            // Compress
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 1600,
                maxHeight: 1600,
                success(result) {
                    // Store compressed file
                    // Compressor returns a Blob or File. We need File for FormData usually, but Blob works too.
                    filesRef.current.push(result as File);
                },
                error(err) {
                    console.error(err.message);
                    // Fallback to original if compression fails? 
                    filesRef.current.push(file);
                },
            });
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!formRef.current) return;
        const form = formRef.current;

        // Basic Validation Check (HTML5 validation usually catches this, but to be safe)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setIsSubmitting(true);
        setBtnText("Sending...");

        try {
            const formData = new FormData(form);

            // Replace 'file' input data with our compressed files
            formData.delete("file");
            filesRef.current.forEach(file => {
                formData.append("file", file, file.name);
            });

            const res = await fetch("/api/send-telegram", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setBtnText("Sent!");
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    zIndex: 9999
                });

                // Reset form
                form.reset();
                setThumbnails([]);
                filesRef.current = [];
                setTimeout(() => {
                    setBtnText("Send request");
                    setIsSubmitting(false);
                }, 3000);

            } else {
                throw new Error(data.error || "Submission failed");
            }

        } catch (error) {
            console.error(error);
            setBtnText("Error - Try WhatsApp");
            setIsSubmitting(false);
        }
    };

    return (
        <section className="section" id="quote">
            <div className="wrap">
                <ScrollReveal>
                    <div className="kicker">Free estimate</div>
                    <div className="title">Get a quote today</div>
                    <p className="sub">Send a quick message. For best accuracy, include a photo of the area.</p>
                </ScrollReveal>

                <ScrollReveal className="card">
                    <form id="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
                        {/* Honeypot */}
                        <div style={{ display: "none" }} aria-hidden="true">
                            <input type="text" name="fi-honeypot" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="field">
                            <label htmlFor="firstName">Name</label>
                            <div className="input-wrap">
                                <input id="firstName" name="fi-sender-firstName" placeholder="Your name" autoComplete="name" required />
                                <span className="validator"><i className="fa-solid fa-circle-check"></i></span>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="phone">Phone</label>
                            <div className="input-wrap">
                                <input id="phone" name="fi-sender-phone" placeholder="(504) 327-9193" autoComplete="tel" required />
                                <span className="validator"><i className="fa-solid fa-circle-check"></i></span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="fi-text-message" placeholder="Tell us what you need cleaned + any stains/odors + timing." required></textarea>
                        </div>

                        <div className="upload">
                            <label className="upload-btn" htmlFor="attachment">
                                <span className="icon" aria-hidden="true">📎</span>
                                Attach photos (optional)
                            </label>
                            {/* Note: We handle files manually via onChange, but we keep simple input here. 
                  We won't use the input's own file list for submission, but we use it to trigger selection. */}
                            <input
                                id="attachment"
                                type="file"
                                name="file-trigger"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                            <div className="upload-note">Optional: add photos here, or use WhatsApp/text below.</div>
                        </div>

                        <div className="thumbs" id="photoThumbs" aria-live="polite">
                            {thumbnails.map((src, i) => (
                                <img key={i} src={src} className="thumb" alt="preview" />
                            ))}
                        </div>

                        <div className="upload">
                            <a className="upload-btn" href="https://wa.me/15043279193" target="_blank" rel="noopener noreferrer">
                                <span className="icon" aria-hidden="true">💬</span>
                                Send photos via WhatsApp
                            </a>
                            <div className="upload-note">Or text photos to: +1 (504) 327-9193</div>
                        </div>

                        <button className="submit" type="submit" disabled={isSubmitting}>{btnText}</button>
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
}
