import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { loadYouTubeApi } from './lib/youtube.js';
import About from './components/About.jsx';
import Clients from './components/Clients.jsx';
import ClosingCTA from './components/ClosingCTA.jsx';
import Contact from './components/Contact.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import PhotographyGallery from './components/PhotographyGallery.jsx';
import Pricing from './components/Pricing.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SeoVideoSchema from './components/SeoVideoSchema.jsx';
import Services from './components/Services.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';

// Page flow: all the work first (video, then stills), then services, one
// unified pricing section, the people, and the close.
export default function App() {
  // The browser's own anchor scroll fires before React has rendered the
  // sections, so shared links like /#pricing land at the top. Re-run the
  // jump once the sections exist (#play- hashes are the lightbox's).
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.startsWith('#play-')) return;
    const el = document.getElementById(hash.slice(1));
    if (el) window.requestAnimationFrame(() => el.scrollIntoView());
  }, []);

  // Warm up the YouTube IFrame API once the main thread is idle — takes
  // ~500ms off the first YouTube tile preview without competing with load.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => window.setTimeout(fn, 2000));
    const handle = idle(() => loadYouTubeApi());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(handle);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Clients />
        <PhotographyGallery />
        <Services />
        <Pricing />
        <About />
        <ClosingCTA />
        <Contact />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
      <CursorGlow />
      <SeoVideoSchema />
      <Analytics />
    </div>
  );
}
