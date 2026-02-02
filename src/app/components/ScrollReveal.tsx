"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    threshold?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    threshold = 0.12,
    ...props
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Fallback if IntersectionObserver not supported (rare now but good practice)
        if (!("IntersectionObserver" in window)) {
            el.classList.add("on");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("on");
                    // Once revealed, we can stop observing if we don't want it to toggle back
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div ref={ref} className={`reveal ${className}`} {...props}>
            {children}
        </div>
    );
}
