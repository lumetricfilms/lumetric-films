import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import PhotographyGallery from './components/PhotographyGallery.jsx';
import Services from './components/Services.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Services />
        <PhotographyGallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
