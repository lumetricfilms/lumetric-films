import { Analytics } from '@vercel/analytics/react';
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
import Services from './components/Services.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Clients />
        <Services />
        <Pricing />
        <PhotographyGallery />
        <About />
        <ClosingCTA />
        <Contact />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
      <CursorGlow />
      <Analytics />
    </div>
  );
}
