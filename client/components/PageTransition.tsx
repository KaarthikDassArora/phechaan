import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import PhechaanLogo from "@/components/PhechaanLogo";

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 animate-spin">
          <PhechaanLogo size={80} />
        </div>
        <div className="text-phechaan-gold text-lg font-semibold animate-pulse">
          Loading...
        </div>
        <div className="w-32 h-1 bg-phechaan-gold/20 rounded-full mt-4 mx-auto overflow-hidden">
          <div className="h-full bg-phechaan-gold rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
