import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for Intersection Observer
 * Detects when an element enters or exits the viewport
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visible to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @param {Element} options.root - The element used as the viewport
 * @returns {Object} { ref, isVisible } - Ref to attach to element and visibility state
 */
export const useIntersectionObserver = (options = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    root = null 
  } = options;
  
  // Start with true to allow initial render, then let observer take over
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, root]);

  return { ref, isVisible };
};

/**
 * Custom hook for Intersection Observer with external ref
 * Use this when you need to pass an existing ref
 * 
 * @param {React.RefObject} elementRef - Ref to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {boolean} isVisible - Whether the element is in viewport
 */
export const useIntersectionObserverWithRef = (elementRef, options = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    root = null 
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin, root]);

  return isVisible;
};

export default useIntersectionObserver;
