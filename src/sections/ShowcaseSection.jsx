import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";
import { projectsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Category filter options
const CATEGORIES = [
  { id: "all", label: "All Projects", icon: "🚀" },
  { id: "web", label: "Web Development", icon: "🌐" },
  { id: "ai", label: "AI / ML", icon: "🤖" },
];

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const INITIAL_DISPLAY_COUNT = 5;

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projectsData;
    return projectsData.filter((project) => project.type === activeCategory);
  }, [activeCategory]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreProjects = filteredProjects.length > INITIAL_DISPLAY_COUNT;

  // Handle category change with animation
  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    
    // Animate out current cards
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.03,
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

    // Animate project cards on category change or initial load
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [activeCategory, showAll]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

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
              >
                <span className="tab-icon">{cat.icon}</span>
                <span className="tab-label">{cat.label}</span>
                {activeCategory === cat.id && <span className="tab-indicator" />}
              </button>
            ))}
          </div>

        {/* Unified Project Grid */}
        <div className={`project-grid projects-${visibleProjects.length}`} ref={gridRef}>
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${index === 0 && visibleProjects.length > 2 ? 'project-card-featured' : ''}`}
              onClick={() => openProjectModal(project)}
            >
              <div className="card-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="card-overlay">
                  <div className="card-tags">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="card-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="card-view-btn">
                  <span>View Details</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-category">{project.category}</span>
                  <span className="card-year">{project.year}</span>
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Buttons */}
        {hasMoreProjects && !showAll && (
          <div className="show-more-wrapper">
            <button className="show-more-btn" onClick={handleShowMore}>
              <span>Show More Projects</span>
              <span className="show-more-count">+{projectsData.length - INITIAL_DISPLAY_COUNT}</span>
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
      </div>

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
                  <a href={selectedProject.liveUrl} className="modal-btn modal-btn-primary" target="_blank" rel="noopener noreferrer">
                    <span>Live Demo</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href={selectedProject.githubUrl} className="modal-btn modal-btn-secondary" target="_blank" rel="noopener noreferrer">
                    <span>Source Code</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowcaseSection;
