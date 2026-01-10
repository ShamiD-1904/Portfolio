import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { navLinks } from "../constants";
import { socialLinks } from "../constants";
import { useIsMobile } from "../hooks";



// Tech stack used to build the portfolio
const techStack = [
  { name: "React", url: "https://react.dev" },
  { name: "Three.js", url: "https://threejs.org" },
  { name: "GSAP", url: "https://gsap.com" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "Vite", url: "https://vitejs.dev" },
  {name: "Supabase", url: "https://supabase.com"}
];

const Footer = () => {
const isMobile = useIsMobile();
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer elements on scroll into view
      gsap.from(".footer-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the gradient line
      gsap.from(".footer-gradient-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-section ">
      {/* Top gradient line */}
      <div className="footer-gradient-line" />

      <div className="footer-container">
        <div className="footer-content">
          {/* Brand & CTA Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">Shamishka Darshana</span>
              <span className="logo-accent">.</span>
            </div>
            <p className="footer-tagline">
              Crafting digital experiences with code and creativity.
              Let's build something amazing together.
            </p>
            <a href="#contact" className="footer-cta">
              <span className="cta-pulse" />
              <span>Available for work</span>
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div className= {`footer-links `} >
            <h4 className="footer-heading">Navigation</h4>
            <ul className="links-list">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="footer-link">
                    <span className="link-dot" />
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="footer-link">
                  <span className="link-dot" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
            
          {/* Social Links */}
          <div className="footer-social">
            <h4 className="footer-heading">Connect With Me</h4>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="social-tooltip">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Email Quick Copy */}
            <div className="footer-email">
              <span className="email-label">Say hello</span>
              <a href="mailto:shamidwebdev@gmail.com" className="email-link">
                shamidwebdev@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-built">
            <span className="built-label">Built with</span>
            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <a
                  key={index}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-link"
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-copyright">
            <span>© {currentYear} Shamishka Darshana. All rights reserved.</span>
          </div>

          
        </div>
      </div>

      {/* Background decoration */}
      <div className="footer-bg-glow" />
    </footer>
  );
};

export default memo(Footer);
