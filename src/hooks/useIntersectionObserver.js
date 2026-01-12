import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (options = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    root = null 
  } = options;
  
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
