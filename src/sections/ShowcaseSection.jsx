import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";
import { projectsData as fallbackProjectsData } from "../constants";
import { fetchProjects, supabase } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = Object.freeze([
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "ai", label: "AI / ML" },
]);

const INITIAL_DISPLAY_COUNT = 5;

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const rafRef = useRef(null);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState(fallbackProjectsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      const glowX = 50 + rotateY * 4;
      const glowY = 50 + rotateX * 4;
      
      card.style.setProperty('--rotateX', `${rotateX}deg`);
      card.style.setProperty('--rotateY', `${rotateY}deg`);
      card.style.setProperty('--glowX', `${glowX}%`);
      card.style.setProperty('--glowY', `${glowY}%`);
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
    card.style.setProperty('--glowX', '50%');
    card.style.setProperty('--glowY', '50%');
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      if (!supabase) {
        setProjects(fallbackProjectsData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await fetchProjects();

        if (error) {
          console.warn('Failed to fetch from Supabase, using fallback:', error);
          setProjects(fallbackProjectsData);
          setError('Using local data');
        } else if (data && data.length > 0) {
          const transformedData = data.map(proj => ({
            id: proj.id,
            title: proj.title,
            type: proj.type,
            category: proj.category,
            year: proj.year,
            image: proj.image,
            tags: proj.tags,
            shortDescription: proj.short_description,
            fullDescription: proj.full_description,
            features: proj.features,
            liveUrl: proj.live_url,
            githubUrl: proj.github_url,
            isFeatured: proj.is_featured || false,
          }));
          setProjects(transformedData);
        } else {
          setProjects(fallbackProjectsData);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setProjects(fallbackProjectsData);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered;
    if (activeCategory === "all") {
      filtered = projects;
    } else {
      filtered = projects.filter((project) => project.type === activeCategory);
    }
    
    return filtered.sort((a, b) => {
      if (a.isFeatured === b.isFeatured) return 0;
      return a.isFeatured ? -1 : 1;
    });
  }, [activeCategory, projects]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreProjects = filteredProjects.length > INITIAL_DISPLAY_COUNT;

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    
    const cards = gridRef.current?.querySelectorAll('.project-bento-card');
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.25,
        stagger: 0.04,
        onComplete: () => {
          setActiveCategory(categoryId);
          setShowAll(false);
        }
      });
    } else {
      setActiveCategory(categoryId);
      setShowAll(false);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = gridRef.current?.querySelectorAll('.project-bento-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory, showAll]);

  const openProjectModal = useCallback((project) => {
    setSelectedProject(project);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, []);

  const handleShowMore = useCallback(() => setShowAll(true), []);
  const handleShowLess = useCallback(() => setShowAll(false), []);

  return (
    <section ref={sectionRef} id="work" className="showcase-section-modern">
      <div className="showcase-container">
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge">
            <span className="badge-dot"></span>
            <span>Featured Projects</span>
          </div>
          <h2 className="showcase-title">
            Crafting Digital
            <span className="gradient-text"> Experiences</span>
          </h2>
          <p className="showcase-subtitle">
            Explore a curated collection of projects that showcase innovation, creativity, and technical excellence
          </p>

          
        </div>

        {/* Counter */}
        <div className="showcase-counter">
          <AnimatedCounter />
        </div>

        {/* Category Filter Tabs */}
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
                disabled={loading}
              >
                <span className="tab-icon">{cat.icon}</span>
                <span className="tab-label">{cat.label}</span>
                {activeCategory === cat.id && <span className="tab-indicator" />}
              </button>
            ))}
          </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container" style={{
            textAlign: 'center',
            padding: '3rem 0',
            opacity: 0.6
          }}>
            <div className="loading-spinner" style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0, 194, 168, 0.2)',
              borderTopColor: '#00c2a8',
              borderRadius: '50%',
              willChange: 'transform',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p>Loading projects...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{
            padding: '1rem',
            marginBottom: '2rem',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '0.5rem',
            color: 'rgba(255, 193, 7, 0.8)',
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Projects Grid (only show if not loading) */}
        {!loading && (
          <>
            {/* Modern Bento Grid with Glassmorphism */}
            <div className={`project-bento-grid projects-${visibleProjects.length}`} ref={gridRef}>
              {visibleProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-bento-card ${project.isFeatured ? 'bento-featured' : ''}`}
                  onClick={() => openProjectModal(project)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <div className="bento-featured-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      <span>Featured</span>
                    </div>
                  )}
                  
                  {/* Glow Effect - CSS driven */}
                  <div className="bento-glow" aria-hidden="true" />
                  
                  {/* Image Section with Overlay */}
                  <div className="bento-image-container">
                    <img 
                      src={project.image} 
                      alt=""
                      width={600}
                      height={400}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="bento-image"
                    />
                    <div className="bento-image-overlay" aria-hidden="true" />
                    
                    {/* Floating Tech Stack */}
                    <div className="bento-tech-stack">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="bento-content">
                    <div className="bento-meta">
                      <span className="bento-category">
                        <span className="category-dot" aria-hidden="true" />
                        {project.category}
                      </span>
                      <span className="bento-year">{project.year}</span>
                    </div>
                    
                    <h3 className="bento-title">{project.title}</h3>
                    <p className="bento-description">{project.shortDescription}</p>
                    
                    {/* Interactive CTA */}
                    <div className="bento-cta">
                      <span className="cta-text">Explore Project</span>
                      <span className="cta-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Show More / Show Less Buttons */}
            {hasMoreProjects && !showAll && (
              <div className="show-more-wrapper">
                <button className="show-more-btn" onClick={handleShowMore}>
                  <span>Show More Projects</span>
                  <span className="show-more-count">+{filteredProjects.length - INITIAL_DISPLAY_COUNT}</span>
                  <svg className="show-more-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M10 16L4 10M10 16L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
            {hasMoreProjects && showAll && (
              <div className="show-more-wrapper">
                <button className="show-less-btn" onClick={handleShowLess}>
                  <span>Show Less</span>
                  <svg className="show-less-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProjectModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="modal-content">
              <div className="modal-image-section">
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="modal-info-section">
                <div className="modal-header">
                  <div className="modal-meta">
                    <span className="modal-category">{selectedProject.category}</span>
                    <span className="modal-year">{selectedProject.year}</span>
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                </div>

                <div className="modal-description">
                  <p>{selectedProject.fullDescription}</p>
                </div>

                <div className="modal-features">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedProject.features.map((feature, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} className="modal-btn modal-btn-primary" target="_blank" rel="noopener noreferrer">
                      <span>Live Demo</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} className="modal-btn modal-btn-secondary" target="_blank" rel="noopener noreferrer">
                      <span>Source Code</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default ShowcaseSection;
