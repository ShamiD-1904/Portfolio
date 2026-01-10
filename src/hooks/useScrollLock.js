import { useEffect, useRef } from "react";

/**
 * Custom hook to lock body scroll
 * Useful for modals, drawers, and other overlay components
 * Preserves scroll position when lock is released
 * 
 * @param {boolean} isLocked - Whether to lock the scroll
 */
export const useScrollLock = (isLocked) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isLocked) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Lock body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isLocked]);
};

export default useScrollLock;
