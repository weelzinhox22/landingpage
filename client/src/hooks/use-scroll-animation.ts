import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  animation?: gsap.TweenVars;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  pin?: boolean;
  pinSpacing?: boolean;
  anticipatePin?: number;
}

/**
 * Custom hook to create scroll-based animations
 * @param element Element ref to animate
 * @param options ScrollTrigger options
 * @returns ScrollTrigger instance
 */
export function useScrollAnimation(
  element: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    animation = { y: 50, opacity: 0 },
    markers = false,
    toggleActions = 'play none none none',
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    pin = false,
    pinSpacing = true,
    anticipatePin = 0
  } = options;

  const scrollTriggerRef = useRef<ScrollTrigger>();

  useEffect(() => {
    if (!element.current) return;

    // Set up the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger ? (typeof trigger === 'string' ? trigger : trigger.current) : element.current,
        start,
        end,
        scrub,
        markers,
        toggleActions,
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack,
        pin: pin ? (typeof trigger === 'string' ? trigger : trigger?.current || element.current) : false,
        pinSpacing,
        anticipatePin
      }
    });

    // Create the animation
    tl.from(element.current, {
      duration: 0.8,
      ease: 'power3.out',
      ...animation
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    // Clean up animation on unmount
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        tl.kill();
      }
    };
  }, [element, trigger, start, end, scrub, animation, markers, toggleActions, onEnter, onLeave, onEnterBack, onLeaveBack, pin, pinSpacing, anticipatePin]);

  return scrollTriggerRef;
}

export default useScrollAnimation;
