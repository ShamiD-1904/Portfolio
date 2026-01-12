import { useMediaQuery } from "react-responsive";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  smallMonitor: 1280,
  desktop: 1536,
};

export const useIsMobile = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.mobile}px)` });
};

export const useIsTablet = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.tablet}px)` });
};

export const useIsSmallMonitor = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.smallMonitor}px)` });
};

export const useIsDesktop = () => {
  return useMediaQuery({ query: `(max-width: ${BREAKPOINTS.desktop}px)` });
};

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
