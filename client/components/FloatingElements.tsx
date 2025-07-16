import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FloatingElementsProps {
  count?: number;
  color?: string;
  size?: number;
}

export default function FloatingElements({
  count = 20,
  color = "phechaan-gold",
  size = 2,
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements: HTMLDivElement[] = [];

    // Create floating elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement("div");
      element.className =
        "absolute w-2 h-2 bg-phechaan-gold/20 rounded-full blur-sm";
      element.style.left = Math.random() * 100 + "%";
      element.style.top = Math.random() * 100 + "%";
      containerRef.current.appendChild(element);
      elements.push(element);

      // Animate each element
      gsap.to(element, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: Math.random() * 8 + 5,
        repeat: -1,
        delay: Math.random() * 3,
        ease: "power1.out",
      });

      // Add rotation
      gsap.to(element, {
        rotation: 360,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, [count, color, size]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
}
