import Hero from './sections/Hero';
import ShowcaseSection from './sections/ShowcaseSection';
import NavBar from './components/NavBar';
import FeatureCards from './sections/FeatureCards'
import Contact from './sections/Contact';
import Testimonials from './sections/Testimonials';

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <FeatureCards />
      
      <Testimonials />
      <Contact />
    </>
  );
};

export default App;


