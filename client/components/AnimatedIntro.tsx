import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import PhechaanLogo from "@/components/PhechaanLogo";

interface AnimatedIntroProps {
  onComplete: () => void;
}

export default function AnimatedIntro({ onComplete }: AnimatedIntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowContent(true);
      },
    });

    // Initial state with dramatic effects
    gsap.set(
      [logoRef.current, taglineRef.current, ctaRef.current, scrollRef.current],
      {
        opacity: 0,
        y: 100,
        scale: 0.5,
        rotation: 180,
        filter: "blur(20px)",
      },
    );

    gsap.set(sunRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -180,
    });

    gsap.set(mountainsRef.current, {
      y: 200,
      opacity: 0,
      skewX: 25,
    });

    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-phechaan-gold rounded-full opacity-60";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        introRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -window.innerHeight,
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0,
          duration: Math.random() * 5 + 3,
          repeat: -1,
          delay: Math.random() * 3,
          ease: "power2.out",
        });
      }
    };
    createParticles();

    // Enhanced animation sequence
    tl.to(mountainsRef.current, {
      duration: 2.5,
      y: 0,
      opacity: 1,
      skewX: 0,
      ease: "elastic.out(1, 0.3)",
    })
      .to(
        sunRef.current,
        {
          duration: 2.5,
          scale: 1,
          opacity: 1,
          rotation: 0,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1.5",
      )
      .to(logoRef.current, {
        duration: 2,
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        ease: "elastic.out(1, 0.3)",
      })
      .to(
        taglineRef.current,
        {
          duration: 1.5,
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          ease: "back.out(1.7)",
        },
        "-=1",
      )
      .to(
        ctaRef.current,
        {
          duration: 1.2,
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.8",
      )
      .to(
        scrollRef.current,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

    // Enhanced continuous animations
    gsap.to(sunRef.current, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    gsap.to(sunRef.current, {
      scale: 1.1,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(scrollRef.current, {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Add pulsing glow effect to scroll indicator
    gsap.to(scrollRef.current, {
      boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Add floating animation to logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleSkip = () => {
    onComplete();
  };

  const handleScroll = () => {
    onComplete();
  };

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 bg-gradient-to-b from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze overflow-hidden"
    >
      {/* Background Mountains */}
      <div
        ref={mountainsRef}
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-phechaan-earth to-transparent"
        style={{
          clipPath:
            "polygon(0 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)",
        }}
      />

      {/* Sun */}
      <div
        ref={sunRef}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-phechaan-gold to-phechaan-dark-gold rounded-full shadow-lg"
        style={{
          boxShadow: "0 0 100px rgba(255, 204, 0, 0.3)",
        }}
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6">
            <PhechaanLogo size={96} className="w-full h-full" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-phechaan-gold mb-4">
            Phechaan
          </h1>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mb-12">
          <p className="text-2xl md:text-3xl text-phechaan-cream font-light">
            Rediscover Your Roots...
          </p>
          <p className="text-lg md:text-xl text-phechaan-cream/80 mt-2">
            Explore India the Real Way
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mb-16">
          <button
            onClick={handleScroll}
            className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          onClick={handleScroll}
          className="cursor-pointer flex flex-col items-center text-phechaan-cream/60 hover:text-phechaan-cream transition-colors duration-300 group"
        >
          <span className="text-sm mb-2 group-hover:scale-110 transition-transform duration-300">
            Scroll to explore
          </span>
          <div className="relative">
            <ChevronDown
              size={32}
              className="group-hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-phechaan-gold/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Skip Button */}
      {showContent && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-phechaan-cream/60 hover:text-phechaan-cream transition-colors"
        >
          Skip
        </button>
      )}
    </div>
  );
}
