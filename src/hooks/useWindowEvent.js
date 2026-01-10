import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to add window event listeners with automatic cleanup
 * 
 * @param {string} eventName - The event name to listen for (e.g., 'click', 'scroll', 'resize')
 * @param {Function} handler - The event handler function
 * @param {Object} options - Optional event listener options
 * @param {boolean} enabled - Whether the listener should be active (default: true)
 */
export const useWindowEvent = (eventName, handler, options = {}, enabled = true) => {
  const savedHandler = useRef(handler);

  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const eventListener = (event) => savedHandler.current(event);
    
    window.addEventListener(eventName, eventListener, options);
    
    return () => window.removeEventListener(eventName, eventListener, options);
  }, [eventName, options, enabled]);
};

/**
 * Custom hook for scroll event listener
 * 
 * @param {Function} handler - The scroll event handler
 * @param {boolean} enabled - Whether the listener should be active
 */
export const useScroll = (handler, enabled = true) => {
  useWindowEvent('scroll', handler, { passive: true }, enabled);
};

/**
 * Custom hook for detecting scroll position
 * 
 * @param {number} threshold - Scroll position threshold (default: 10)
 * @returns {boolean} isScrolled - Whether scrolled past threshold
 */
export const useIsScrolled = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useWindowEvent('scroll', () => {
    setIsScrolled(window.scrollY > threshold);
  });

  return isScrolled;
};

/**
 * Custom hook for mouse position tracking
 * 
 * @returns {Object} { x, y } - Normalized mouse position (-1 to 1)
 */
export const useMousePosition = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export default useWindowEvent;
