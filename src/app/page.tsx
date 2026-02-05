import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; // Actually Hero is async/server, but we can't import server component into client component directly if we use "use client" here.
// Wait, to use Context Provider, we likely need a Client Component wrapper.
// But Hero is server component.
// Better strategy: Put Context Provider in layout.tsx or a separate provider file.
// But I can make this page.tsx a Server Component and import Client Components.
// Which components are client? Navbar (yes), Hero (Server), PriceGrid (Client), etc.

// Let's refactor:
// page.tsx (Server) -> renders Hero (Server) and other Client Components.
// But we need LightboxProvider to wrap them.
// We can wrap the children in layout.tsx with LightboxProvider? 
// Or render a Client Wrapper in page.tsx that wraps the content? 
// If Hero is server, it can't be children of a client component if we import it directly?
// actually it can if passed as children.
// But simpler: Move LightboxProvider to layout.tsx (or a ClientLayout).

// For now, let's keep page.tsx as Server Component.

import { LightboxProvider } from "./context/LightboxContext";
import Lightbox from "./components/Lightbox";

// We need a client wrapper for the provider if we want to use it here, 
// OR we export a Client Component that just renders the provider and children.
// Let's create `Providers.tsx`? Or just put it in layout.
// I'll put it in layout.tsx to be clean.

// Re-writing page.tsx as Server Component.
import PriceGrid from "./components/PriceGrid";
import Benefits from "./components/Benefits";
import WorkGallery from "./components/WorkGallery";
import ProcessVideo from "./components/ProcessVideo";
import ProcessSteps from "./components/ProcessSteps";
import Reviews from "./components/Reviews";
import QuoteForm from "./components/QuoteForm";
import FAQ from "./components/FAQ";
import Map from "./components/Map";
import FloatingCTA from "./components/FloatingCTA";
import Footer from "./components/Footer";

// We need to handle the Hero import carefully. 
// Hero is async. 
// If we use it in a Server Component, it's fine.

export default function Home() {
    return (
        <main id="top">
            <Navbar />
            <Hero />
            <PriceGrid />
            <Benefits />
            <WorkGallery />
            <ProcessVideo />
            <ProcessSteps />
            <Reviews />
            <QuoteForm />
            <FAQ />
            <Map />
            <Footer />
            <FloatingCTA />
            <Lightbox />
        </main>
    );
}
