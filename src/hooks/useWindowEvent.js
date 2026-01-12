import { useEffect, useRef, useState } from "react";

export const useWindowEvent = (eventName, handler, options = {}, enabled = true) => {
  const savedHandler = useRef(handler);

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

export const useScroll = (handler, enabled = true) => {
  useWindowEvent('scroll', handler, { passive: true }, enabled);
};

export const useIsScrolled = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useWindowEvent('scroll', () => {
    setIsScrolled(window.scrollY > threshold);
  });

  return isScrolled;
};

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
