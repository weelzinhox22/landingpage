import { useRef, useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollOptions {
  container?: RefObject<HTMLElement>;
  trigger?: string;
  start?: string;
  end?: string;
  markers?: boolean;
  pin?: boolean;
  anticipatePin?: number;
  scrub?: boolean | number;
  snap?: boolean | object;
}

/**
 * Custom hook that provides a reference to a horizontally scrollable element
 * and optionally sets up ScrollTrigger for synchronized vertical scrolling
 */
export function useHorizontalScroll(options?: HorizontalScrollOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger>();

  useEffect(() => {
    if (!scrollRef.current) return;

    // Enable native horizontal scrolling without the ScrollTrigger
    if (!options) return;

    const {
      container,
      trigger,
      start = 'top top',
      end = 'bottom bottom',
      markers = false,
      pin = true,
      anticipatePin = 0,
      scrub = true,
      snap
    } = options;

    // Set up ScrollTrigger for synchronized scrolling
    if (container?.current || trigger) {
      const containerElement = container?.current;
      const triggerElement = trigger ? document.querySelector(trigger) : scrollRef.current;
      
      if (!triggerElement) return;

      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      // Only apply ScrollTrigger if there is overflow content to scroll
      if (scrollWidth > clientWidth) {
        const horizontalScroll = gsap.to(scrollRef.current, {
          x: () => -(scrollWidth - clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement,
            start,
            end,
            markers,
            pin: pin ? containerElement || triggerElement : false,
            anticipatePin,
            scrub,
            invalidateOnRefresh: true,
            snap
          }
        });

        triggerRef.current = horizontalScroll.scrollTrigger;
      }
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [options]);

  return scrollRef;
}

export default useHorizontalScroll;
