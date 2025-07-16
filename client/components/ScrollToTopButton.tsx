import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth shadow-2xl hover:shadow-phechaan-gold/25 transition-all duration-300 transform hover:scale-110 animate-pulse"
      size="sm"
    >
      <ChevronUp size={24} />
    </Button>
  );
}
