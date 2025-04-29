import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile
 * @param breakpoint Optional custom breakpoint in pixels (default: 768)
 * @returns Boolean indicating if the viewport is smaller than the breakpoint
 */
export function useMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    // Set initial state
    setIsMobile(window.innerWidth < breakpoint);

    // Create event listener function
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
