import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import FeaturedReel from './components/FeaturedReel.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import PhotographyGallery from './components/PhotographyGallery.jsx';
import SelectedWork from './components/SelectedWork.jsx';
import Services from './components/Services.jsx';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedReel />
        <Services />
        <SelectedWork />
        <PhotographyGallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
