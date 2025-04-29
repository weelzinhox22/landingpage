import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  container?: string | RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Custom hook to create a parallax scrolling effect
 * @param element Element ref to apply parallax to
 * @param options Parallax options
 */
export function useParallax(
  element: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'vertical',
    container,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    markers = false
  } = options;

  const parallaxRef = useRef<ScrollTrigger>();

  useEffect(() => {
    if (!element.current) return;

    // Calculate movement amount based on speed
    const movement = direction === 'vertical' 
      ? { y: speed * 100 }
      : { x: speed * 100 };

    // Create the parallax effect
    const parallax = gsap.to(element.current, {
      ease: 'none',
      ...movement,
      scrollTrigger: {
        trigger: container 
          ? (typeof container === 'string' ? container : container.current) 
          : element.current,
        start,
        end,
        scrub,
        markers,
      }
    });

    parallaxRef.current = parallax.scrollTrigger;

    // Clean up animation on unmount
    return () => {
      if (parallaxRef.current) {
        parallaxRef.current.kill();
        parallax.kill();
      }
    };
  }, [element, speed, direction, container, start, end, scrub, markers]);

  return parallaxRef;
}

export default useParallax;
