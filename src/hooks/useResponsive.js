import { useMediaQuery } from "react-responsive";

/**
 * Custom hooks for responsive design
 * Provides consistent breakpoint detection across the application
 */

// Breakpoint values (matching Tailwind defaults)
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  smallMonitor: 1280,
  desktop: 1536,
};

/**
 * Hook to detect if device is mobile (max-width: 768px)
 * @returns {boolean}
 */
export const useIsMobile = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.mobile}px)` });
};

/**
 * Hook to detect if device is tablet (max-width: 1024px)
 * @returns {boolean}
 */
export const useIsTablet = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.tablet}px)` });
};

/**
 * Hook to detect if device is small monitor (max-width: 1280px)
 * @returns {boolean}
 */
export const useIsSmallMonitor = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.smallMonitor}px)` });
};

/**
 * Hook to detect if device is desktop (max-width: 1536px)
 * @returns {boolean}
 */
export const useIsDesktop = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.desktop}px)` });
};

/**
 * Combined hook for all responsive breakpoints
 * @returns {Object} Object containing all breakpoint booleans
 */
export const useResponsive = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallMonitor = useIsSmallMonitor();
  const isDesktop = useIsDesktop();
  const isSmallScreen = isMobile || isTablet || isSmallMonitor;

  return {
    isMobile,
    isTablet,
    isSmallMonitor,
    isDesktop,
    isSmallScreen,
  };
};

export default useResponsive;
