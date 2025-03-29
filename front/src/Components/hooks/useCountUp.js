import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 4000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -6 * t);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setCount(0);
          startTimeRef.current = null;
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        const easedProgress = easeOutExpo(progress);
        setCount(Math.floor(end * easedProgress));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return [count, ref];
}