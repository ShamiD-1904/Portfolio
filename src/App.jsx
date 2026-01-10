import Hero from './sections/Hero';
import ShowcaseSection from './sections/ShowcaseSection';
import NavBar from './components/NavBar';
import SkillsSection from './sections/SkillsSection';
import Contact from './sections/Contact';
import Testimonials from './sections/Testimonials';
import Footer from './sections/Footer';

const App = () => {
  

  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <SkillsSection />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;


