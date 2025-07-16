import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export const useSmoothScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
};
