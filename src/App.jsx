import { lazy, Suspense } from 'react';
import Hero from './sections/Hero';
import NavBar from './components/NavBar';

// Lazy load below-the-fold sections for better performance
const ShowcaseSection = lazy(() => import('./sections/ShowcaseSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

// Simple loading fallback
const SectionLoader = () => (
  <div style={{ minHeight: '200px' }} />
);

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <ShowcaseSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;


