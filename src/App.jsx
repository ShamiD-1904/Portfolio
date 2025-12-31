import Hero from './sections/Hero';
import ShowcaseSection from './sections/ShowcaseSection';
import NavBar from './components/NavBar';
import FeatureCards from './sections/FeatureCards';
import ExperienceSection from './sections/ExperienceSection';
import Contact from './sections/Contact';
import Testimonials from './sections/Testimonials';

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <FeatureCards />
      <ExperienceSection />
      
      <Testimonials />
      <Contact />
    </>
  );
};

export default App;


