import { useEffect, useRef } from "react";

export const useScrollLock = (isLocked) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isLocked) {
      scrollPositionRef.current = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      
      window.scrollTo(0, scrollPositionRef.current);
    }

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
