import { useMemo, useState, useEffect } from 'react';
import TitleHeader from '../components/TitleHeader';
import { testimonials as fallbackTestimonials } from '../constants';
import TestimonialCard from '../components/TestimonialCard';
import AddTestimonialCard from '../components/AddTestimonialCard';
import TestimonialModal from '../components/TestimonialModal';
import { fetchTestimonials, addTestimonial, supabase } from '../lib/supabase';

const INITIAL_VISIBLE_COUNT = 6;
const SHOW_MORE_STEP = 4;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Load testimonials from Supabase on mount
  useEffect(() => {
    const loadTestimonials = async () => {
      if (supabase) {
        const { data, error } = await fetchTestimonials();
        
        if (error) {
          console.error('Error fetching testimonials:', error);
          // Fallback to constants if Supabase fails
          setTestimonials(fallbackTestimonials);
        } else if (data && data.length > 0) {
          // Transform Supabase data to match our component format
          const formattedData = data.map(item => ({
            id: item.id,
            name: item.name,
            mentions: item.mentions || '',
            review: item.review,
            imgPath: item.img_path,
            isHighlighted: !!item.is_highlighted,
            createdAt: item.created_at,
          }));
          setTestimonials(formattedData);
        } else {
          // No data in Supabase, use fallback
          setTestimonials(fallbackTestimonials);
        }
      } else {
        // Supabase not configured, use fallback
        setTestimonials(fallbackTestimonials);
      }
    };
    
    loadTestimonials();
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [testimonials.length]);

  // Handle new testimonial submission
  const handleAddTestimonial = async (newTestimonial) => {
    if (supabase) {
      const { error } = await addTestimonial(newTestimonial);
      
      if (error) {
        console.error('Error adding testimonial:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        // Show success message briefly
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } else {
      // Fallback: just log it
      console.log('Testimonial submitted (no Supabase):', newTestimonial);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const { featuredTestimonial, gridTestimonials } = useMemo(() => {
    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      return { featuredTestimonial: null, gridTestimonials: [] };
    }

    const highlighted = testimonials.filter((t) => t?.isHighlighted);
    const featured = highlighted[0] ?? testimonials[0];

    const featuredId = featured?.id;
    const featuredKey = featuredId ?? `${featured?.name ?? ''}-${featured?.createdAt ?? ''}-${featured?.review ?? ''}`;

    const rest = testimonials.filter((t) => {
      const key = (t?.id ?? `${t?.name ?? ''}-${t?.createdAt ?? ''}-${t?.review ?? ''}`);
      return key !== featuredKey;
    });

    return { featuredTestimonial: featured, gridTestimonials: rest };
  }, [testimonials]);

  const visibleGridCount = Math.max(
    visibleCount - (featuredTestimonial ? 1 : 0),
    0
  );
  const visibleGridTestimonials = gridTestimonials.slice(0, visibleGridCount);
  const canShowMore = testimonials.length > visibleCount;
  const canShowLess = visibleCount > INITIAL_VISIBLE_COUNT;

  const handleShowMore = () => {
    setVisibleCount((current) => Math.min(current + SHOW_MORE_STEP, testimonials.length));
  };

  const handleShowLess = () => {
    setVisibleCount((current) => Math.max(INITIAL_VISIBLE_COUNT, current - SHOW_MORE_STEP));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        
        <div className="showcase-header">
          <div className="showcase-badge">
            <span className="badge-dot"></span>
            <span>Client Feedback</span>
          </div>
        </div>
                

        {/* Spotlight + Grid */}
        <div className="testimonials-spotlight">
          <div className="spotlight-copy">
            <h3 className="spotlight-title">Trusted feedback, real results.</h3>
            <p className="spotlight-desc">
              A few words from clients and collaborators I’ve worked with. Highlighted testimonials are featured first.
            </p>
          </div>

          {featuredTestimonial && (
            <div className="spotlight-card">
              <TestimonialCard testimonial={featuredTestimonial} />
            </div>
          )}
        </div>

        <div className="testimonials-grid" aria-label="Testimonials">
          {visibleGridTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id ?? `${testimonial.name}-${testimonial.createdAt ?? index}`}
              testimonial={testimonial}
            />
          ))}
        </div>

        {(canShowMore || canShowLess) && (
          <div className="testimonials-showmore">
            {canShowLess && (
              <button
                type="button"
                className="testimonials-showmore-btn secondary"
                onClick={handleShowLess}
              >
                Show less
              </button>
            )}
            {canShowMore && (
              <button
                type="button"
                className="testimonials-showmore-btn"
                onClick={handleShowMore}
              >
                Show more
              </button>
            )}
          </div>
        )}

        {/* Stationary Add Testimonial Card - Always Visible */}
        <div className="add-testimonial-wrapper">
          <AddTestimonialCard onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Success/Error Message */}
        {submitStatus && (
          <div className={`testimonial-submit-status ${submitStatus}`}>
            {submitStatus === 'success' ? (
              <>
                <span className="status-icon">✓</span>
                <span>Thank you! Your testimonial has been submitted for review.</span>
              </>
            ) : (
              <>
                <span className="status-icon">✕</span>
                <span>Oops! Something went wrong. Please try again.</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
      />
    </section>
  );
};

export default Testimonials;
