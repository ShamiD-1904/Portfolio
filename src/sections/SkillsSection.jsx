import { useRef, memo, Suspense, lazy } from 'react';
import TitleHeader from '../components/TitleHeader';
import { abilities, techStackIcons } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver, useIsMobile } from '../hooks';
import { useEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D Canvas component - this splits Three.js into a separate chunk
const TechIconCanvas = lazy(() => import('../components/TechIconCanvas'));

// Static image component for mobile devices
const TechIconStatic = memo(({ name }) => {
  // Map to determine the primary image format for each tech
  const imageFormats = {
    'React': 'svg',
    'Python': 'png',
    'ThreeJs': 'svg',
    'Git': 'png',
    'AWS': 'png',
    'Docker': 'png'
  };
  
  // Image dimensions for each tech (actual rendered size)
  const imageDimensions = {
    'React': { width: 150, height: 130 },
    'Python': { width: 150, height: 150 },
    'ThreeJs': { width: 150, height: 100 },
    'Git': { width: 150, height: 150 },
    'AWS': { width: 150, height: 90 },
    'Docker': { width: 150, height: 108 }
  };
  
  const primaryFormat = imageFormats[name] || 'png';
  const imagePath = `/images/${name}_mobile.${primaryFormat}`;
  const dimensions = imageDimensions[name] || { width: 150, height: 150 };
  
  return (
    <img 
      src={imagePath} 
      alt={`${name} logo`} 
      className="skill-tech-static-img"
      width={dimensions.width}
      height={dimensions.height}
      loading="lazy"
      decoding="async"
    />
  );
});

// Memoized ability card
const AbilityCard = memo(({ imgPath, title, desc, index }) => (
  <div className="ability-card">
    <div className="ability-card-inner">
      <div className="ability-icon-wrapper">
        <div className="ability-icon-glow" />
        <img 
          src={imgPath} 
          alt={title} 
          className="ability-icon" 
          width={48}
          height={48}
          loading="lazy" 
          decoding="async"
        />
      </div>
      <div className="ability-content">
        <h4 className="ability-title">{title}</h4>
        <p className="ability-desc">{desc}</p>
      </div>
      <span className="ability-number">0{index + 1}</span>
    </div>
  </div>
));

// Memoized skill tag
const SkillTag = memo(({ skill }) => (
  <span className="skill-tag">{skill}</span>
));

const additionalSkills = ["java",'TypeScript', 'Next.js', 'TailwindCSS', 'PostgreSQL', 'MongoDB', "Nodejs", "VHDL"];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const controlsRef = useRef();
  const isMobile = useIsMobile();
  
  // Use custom intersection observer hook for tech grid
  const { ref: techGridRef, isVisible: isInView } = useIntersectionObserver({ 
    threshold: 0.1, 
    rootMargin: '50px' 
  });

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(0, 0.3, 0);
    controlsRef.current.update();
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ability-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.skill-tech-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-tech-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        <TitleHeader
          title="Skills & Expertise"
          sub="💡 What I Bring to the Table"
        />

        <div className="skills-bento-grid">
          <div className="skills-abilities-col">
            <h3 className="skills-col-title">My Work Ethic</h3>
            <div className="abilities-stack">
              {abilities.map(({ imgPath, title, desc }, index) => (
                <AbilityCard
                  key={title}
                  imgPath={imgPath}
                  title={title}
                  desc={desc}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="skills-tech-col">
            <h3 className="skills-col-title ">Expertise</h3>
            <p className="skills-col-desc">
              The technologies I work with to bring ideas to life.
            </p>
            <div className="skills-tech-grid" ref={techGridRef}>
              {techStackIcons.map((icon) => (
                <div key={icon.name} className="skill-tech-card group">
                  <div className="skill-tech-card-inner">
                    <div className="skill-tech-icon-wrapper">
                      {isMobile ? (
                        <TechIconStatic name={icon.name} />
                      ) : (
                        <Suspense fallback={<TechIconStatic name={icon.name} />}>
                          <TechIconCanvas model={icon} isVisible={isInView} />
                        </Suspense>
                      )}
                    </div>
                    <span className="skill-tech-name">{icon.name}</span>
                  </div>
                  <div className="skill-tech-hover-bg" />
                </div>
              ))}
            </div>

            <div className="skills-tags-wrapper">
              <h4 className="skills-tags-title ">Also experienced with:</h4>
              <div className="skills-tags">
                {additionalSkills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
