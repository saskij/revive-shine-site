"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LightboxContextType {
    isOpen: boolean;
    src: string;
    title: string;
    footer: string;
    openLightbox: (src: string, title?: string, footer?: string) => void;
    closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [src, setSrc] = useState("");
    const [title, setTitle] = useState("");
    const [footer, setFooter] = useState("");

    const openLightbox = (imageSrc: string, imageTitle = "Preview", imageFooter = "Tap outside to close.") => {
        setSrc(imageSrc);
        setTitle(imageTitle);
        setFooter(imageFooter);
        setIsOpen(true);
        // Document body scroll lock could be handled here or in the component
    };

    const closeLightbox = () => {
        setIsOpen(false);
        setSrc("");
    };

    return (
        <LightboxContext.Provider value={{ isOpen, src, title, footer, openLightbox, closeLightbox }}>
            {children}
        </LightboxContext.Provider>
    );
}

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (context === undefined) {
        throw new Error("useLightbox must be used within a LightboxProvider");
    }
    return context;
}
