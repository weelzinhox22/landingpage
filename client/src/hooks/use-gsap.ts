import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type GSAPContext = ReturnType<typeof gsap.context>;

export interface UseGSAPOptions {
  dependencies?: any[];
}

/**
 * Custom hook for GSAP animations with cleanup
 * @param callback Function that contains all GSAP animations
 * @param scope Ref to the element that will contain the animations
 * @param options Additional options
 */
export function useGSAP(
  callback: (context: GSAPContext) => void,
  scope: RefObject<HTMLElement>,
  options: UseGSAPOptions = {}
) {
  const { dependencies = [] } = options;
  const contextRef = useRef<GSAPContext | null>(null);

  useEffect(() => {
    if (!scope.current) return;

    // Create a new GSAP context
    const ctx = gsap.context(callback, scope);
    contextRef.current = ctx;

    // Clean up the animations when component unmounts
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
        contextRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, ...dependencies]);

  return contextRef;
}

export default useGSAP;
