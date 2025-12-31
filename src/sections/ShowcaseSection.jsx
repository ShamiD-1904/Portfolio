import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

// Projects data - Add new projects here easily
const projectsData = [
  {
    id: 1,
    title: "NexCare",
    category: "Healthcare",
    year: "2024",
    image: "/images/project1.png",
    tags: ["React Native", "Expo", "TailwindCSS"],
    shortDescription: "A streamlined digital solution for modern healthcare management.",
    fullDescription: "NexCare is a comprehensive healthcare management platform that revolutionizes patient scheduling and medical record management. Built with React Native and Expo for cross-platform compatibility, it offers a seamless user experience with real-time appointment booking, prescription tracking, and secure communication between patients and healthcare providers.",
    features: ["Patient Scheduling", "Medical Records", "Real-time Chat", "Prescription Management"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Library Management",
    category: "Education",
    year: "2024",
    image: "/images/project2.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    shortDescription: "Comprehensive platform for managing library resources.",
    fullDescription: "A full-featured library management system that streamlines book cataloging, member management, and borrowing processes. Features include advanced search, automated late fee calculation, and detailed analytics for library administrators.",
    features: ["Book Cataloging", "Member Management", "Borrowing System", "Analytics Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "YC Directory",
    category: "Web App",
    year: "2024",
    image: "/images/project3.png",
    tags: ["Next.js", "Sanity", "TailwindCSS"],
    shortDescription: "Startup showcase app for discovering innovative companies.",
    fullDescription: "YC Directory is a curated platform showcasing Y Combinator startups and innovative companies. Users can discover, filter, and connect with startups based on industry, funding stage, and technology stack. Features include startup profiles, founder information, and investment details.",
    features: ["Startup Profiles", "Advanced Filtering", "Founder Connect", "Investment Tracking"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Library Management",
    category: "Education",
    year: "2024",
    image: "/images/project2.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    shortDescription: "Comprehensive platform for managing library resources.",
    fullDescription: "A full-featured library management system that streamlines book cataloging, member management, and borrowing processes. Features include advanced search, automated late fee calculation, and detailed analytics for library administrators.",
    features: ["Book Cataloging", "Member Management", "Borrowing System", "Analytics Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Library Management",
    category: "Education",
    year: "2024",
    image: "/images/project2.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    shortDescription: "Comprehensive platform for managing library resources.",
    fullDescription: "A full-featured library management system that streamlines book cataloging, member management, and borrowing processes. Features include advanced search, automated late fee calculation, and detailed analytics for library administrators.",
    features: ["Book Cataloging", "Member Management", "Borrowing System", "Analytics Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
  },{
    id: 2,
    title: "Library Management",
    category: "Education",
    year: "2024",
    image: "/images/project2.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    shortDescription: "Comprehensive platform for managing library resources.",
    fullDescription: "A full-featured library management system that streamlines book cataloging, member management, and borrowing processes. Features include advanced search, automated late fee calculation, and detailed analytics for library administrators.",
    features: ["Book Cataloging", "Member Management", "Borrowing System", "Analytics Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
  },
  // Add more projects here following the same structure
];

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 5;

  const visibleProjects = showAll ? projectsData : projectsData.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreProjects = projectsData.length > INITIAL_DISPLAY_COUNT;

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animate project cards
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15 * index,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
            },
          }
        );
      });
    }
  }, [showAll]);

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

        {/* Show More Button */}
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
