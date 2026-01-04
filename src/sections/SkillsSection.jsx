import { useRef, memo, Suspense, useMemo, useState, useEffect } from 'react';
import TitleHeader from '../components/TitleHeader';
import { abilities, techStackIcons } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';


gsap.registerPlugin(ScrollTrigger);

// Preload all models
techStackIcons.forEach((icon) => useGLTF.preload(icon.modelPath));

// Single 3D model component with controlled animation
const TechModel = memo(({ model, isVisible }) => {
  const { scene } = useGLTF(model.modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const position = model.position ?? [0, 0, 0];

  return (
    <Float
      speed={isVisible ? 4 : 0}
      rotationIntensity={isVisible ? 0.4 : 0}
      floatIntensity={isVisible ? 0.6 : 0}
    >
      <group
        scale={model.scale}
        rotation={model.rotation}
        position={position}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
});

// Component to invalidate frame when visible
const FrameInvalidator = ({ isVisible }) => {
  useFrame(({ invalidate }) => {
    if (isVisible) {
      invalidate();
    }
  });
  return null;
};

// Lightweight Canvas wrapper for each tech card
const TechIconCanvas = memo(({ model, isVisible }) => (
  <Canvas
    frameloop="demand"
    dpr={[1, 1.5]}
    gl={{ antialias: false, powerPreference: 'high-performance' }}
    camera={{ position: [0, 0, 5], fov: 60 }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} />
    <Suspense fallback={null}>
      <TechModel model={model} isVisible={isVisible} />
      <FrameInvalidator isVisible={isVisible} />
    </Suspense>
    <OrbitControls
      target={[0, 0, 0]}  // x,y,z = orbit center
      enableZoom={false}
      enablePan={true}
    />
  </Canvas>
));

// Memoized ability card
const AbilityCard = memo(({ imgPath, title, desc, index }) => (
  <div className="ability-card">
    <div className="ability-card-inner">
      <div className="ability-icon-wrapper">
        <div className="ability-icon-glow" />
        <img src={imgPath} alt={title} className="ability-icon" loading="lazy" />
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
  const techGridRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const controlsRef = useRef();

  // IntersectionObserver to detect when tech grid is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (techGridRef.current) {
      observer.observe(techGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
                      <TechIconCanvas model={icon} isVisible={isInView} />
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
