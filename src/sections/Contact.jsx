import { useState, useRef, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useIntersectionObserver } from "../hooks";

// Placeholder 3D component - replace with actual model later
const ContactModel = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22D3EE" wireframe />
    </mesh>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Use custom intersection observer hook
  const { ref: sectionRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with your email service (EmailJS, Formspree, etc.)
      // For now, simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT: 3D Model */}
        <div className="contact-left">
          <div className="contact-3d-wrapper">
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 45 }}
              frameloop={isVisible ? "always" : "never"}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <ContactModel />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={isVisible}
                autoRotateSpeed={2}
              />
            </Canvas>
          </div>
          
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <img 
                  src="/images/logos/email.svg" 
                  alt="Email"
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <a href="mailto:your@email.com" className="info-value">shamidwebdev@gmail.com</a>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <img 
                  src="/images/logos/location.svg" 
                  alt="Location"
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="info-content" >
                <span className="info-label">Location</span>
                <span className="info-value">Matara, SriLanka</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="contact-right" >
          <div className="contact-header">
            <span className="contact-badge">
              <span className="badge-dot"></span>
              Get In Touch
            </span>
            <h2 className="contact-title">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="contact-subtitle">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="form-textarea"
                rows={5}
                required
              />
            </div>

            {error && (
              <div className="form-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                <span>✓</span> Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
