import { useState, useRef } from 'react';
import { uploadImage } from '../lib/supabase';
import { useScrollLock } from '../hooks';

const TestimonialModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    mentions: '',
    review: '',
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Use custom scroll lock hook
  useScrollLock(isOpen);

  // Handle scroll on overlay to scroll modal content
  const handleOverlayWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (modalRef.current) {
      modalRef.current.scrollTop += e.deltaY;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual file for upload
      setFormData((prev) => ({ ...prev, imageFile: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) return;

    setIsSubmitting(true);
    
    // Upload image if provided
    let imgPath = '/images/default-avatar.svg';
    if (formData.imageFile) {
      const { url, error } = await uploadImage(formData.imageFile);
      if (url && !error) {
        imgPath = url;
      }
    }
    
    const newTestimonial = {
      name: formData.name.trim(),
      mentions: formData.mentions.trim() ? `@${formData.mentions.replace('@', '')}` : '',
      review: formData.review.trim(),
      imgPath: imgPath,
    };

    await onSubmit(newTestimonial);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', mentions: '', review: '', imageFile: null });
    setPreviewImage(null);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="testimonial-modal-overlay"
      onClick={handleBackdropClick}
      onWheel={handleOverlayWheel}
    >
      <div className="testimonial-modal" ref={modalRef}>
        {/* Close Button */}
        <button 
          className="testimonial-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="testimonial-modal-header">
          <div className="testimonial-modal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2>Share Your Experience</h2>
          <p>Your feedback helps others and means the world to me!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="testimonial-form">
          {/* Image Upload */}
          <div className="form-image-upload">
            <div 
              className="image-preview"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <div className="image-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Add Photo</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden-input"
            />
            <span className="image-hint">Optional</span>
          </div>

          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">
              Your Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              maxLength={50}
            />
          </div>

          {/* Social Handle Input */}
          <div className="form-group">
            <label htmlFor="mentions">
              Social Handle <span className="optional">(optional)</span>
            </label>
            <div className="input-with-prefix">
              <span className="input-prefix">@</span>
              <input
                type="text"
                id="mentions"
                name="mentions"
                value={formData.mentions.replace('@', '')}
                onChange={handleInputChange}
                placeholder="username"
                maxLength={30}
              />
            </div>
          </div>

          {/* Review Textarea */}
          <div className="form-group">
            <label htmlFor="review">
              Your Message <span className="required">*</span>
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Share your experience working with me..."
              required
              maxLength={500}
              rows={4}
            />
            <span className="char-count">{formData.review.length}/500</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-testimonial-btn"
            disabled={isSubmitting || !formData.name.trim() || !formData.review.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Submit Testimonial
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;
