const AddTestimonialCard = ({ onClick }) => {
  return (
    <div className="add-testimonial-card" onClick={onClick}>
      <div className="add-testimonial-inner">
        <div className="add-icon-wrapper">
          <div className="add-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div className="add-icon-ring"></div>
          <div className="add-icon-ring delay"></div>
        </div>
        
        <h3 className="add-title">Share Your Story</h3>
        <p className="add-description">
          Had a great experience? Click here to add your testimonial!
        </p>
        
        <div className="add-cta">
          <span>Add Testimonial</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonialCard;
