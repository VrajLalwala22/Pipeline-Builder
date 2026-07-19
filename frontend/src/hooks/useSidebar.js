// useSidebar.js — Mobile sidebar open/close state with viewport detection

import { useState, useEffect, useCallback } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= MOBILE_BREAKPOINT);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, isMobile, open, close, toggle };
};
