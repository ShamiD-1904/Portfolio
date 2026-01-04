import { memo } from 'react';

const TestimonialCard = memo(({ testimonial }) => {
  const { name, mentions, review, imgPath, isUserSubmitted, date, isHighlighted } = testimonial;
  const defaultAvatar = '/images/default-avatar.svg';

  return (
    <div className={`testimonial-card ${isHighlighted ? 'is-highlighted' : ''}`}>
      <div className="testimonial-card-inner">
        {/* Quote Icon */}
        <div className="quote-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Stars */}
        <div className="testimonial-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} className="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {isHighlighted && (
          <div className="testimonial-highlight-badge" aria-label="Highlighted testimonial">
            Featured
          </div>
        )}

        {/* Review Text */}
        <p className="testimonial-review">{review}</p>

        {/* Author Info */}
        <div className="testimonial-author">
          <div className="author-avatar">
            <img 
              src={imgPath || defaultAvatar} 
              alt={name}
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            {isUserSubmitted && (
              <div className="user-badge" title="Community Member">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            )}
          </div>
          <div className="author-info">
            <h4 className="author-name">{name}</h4>
            {mentions && <p className="author-handle">{mentions}</p>}
            {isUserSubmitted && date && (
              <p className="testimonial-date">{date}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestimonialCard;
