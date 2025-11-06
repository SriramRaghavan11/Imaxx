// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component scrolls the window to the top (0, 0)
 * every time the route (location.pathname) changes.
 */
const ScrollToTop = () => {
  // Extracts the pathname from the current URL.
  const { pathname } = useLocation();

  // This effect runs after the component renders and whenever the pathname changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname.

  // This component doesn't render any visible UI.
  return null;
};

export default ScrollToTop;