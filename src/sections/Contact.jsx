import { useState, useRef, memo, lazy, Suspense } from "react";
import { useIntersectionObserver } from "../hooks";
import { sendEmail } from "../lib/emailService";
import { Turnstile } from "@marsidev/react-turnstile";

const ContactCanvas = lazy(() => import("../components/ContactCanvas"));

const Contact = () => {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  
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

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security verification.");
      setLoading(false);
      return;
    }

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTurnstileToken(null);
        turnstileRef.current?.reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || "Failed to send message. Please try again.");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
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
            <Suspense fallback={<div className="w-full h-full bg-gray-900/50 rounded-xl" />}>
              <ContactCanvas isVisible={isVisible} />
            </Suspense>
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

            {/* Cloudflare Turnstile CAPTCHA - Invisible/Managed mode */}
            <div className="turnstile-wrapper">
              <Turnstile
                ref={turnstileRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => {
                  setTurnstileToken(null);
                  setError("Security verification failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileToken(null);
                }}
                options={{
                  theme: "dark",
                  size: "flexible",
                }}
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
