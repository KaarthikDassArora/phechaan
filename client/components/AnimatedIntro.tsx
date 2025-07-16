import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import PhechaanLogo from "@/components/PhechaanLogo";

// Add a simple mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Custom hook for reduced motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// Custom hook for animation logic
function useAnimatedIntro({ refs, isMobile, reducedMotion, onComplete, onSkip }) {
  useEffect(() => {
    if (reducedMotion) {
      // Instantly show content if reduced motion
      refs.setShowContent(true);
      return;
    }
    // Lazy load GSAP
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => refs.setShowContent(true),
      });
      gsap.set([
        refs.textGroupRef.current,
        refs.ctaRef.current,
        refs.scrollRef.current,
      ], {
        opacity: 0,
        y: 100,
        scale: 0.5,
        rotation: 180,
        filter: "blur(20px)",
      });
      gsap.set(refs.sunRef.current, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(refs.mountainsRef.current, { y: 200, opacity: 0, skewX: 25 });
      // Animate sequence
      tl.to(refs.mountainsRef.current, { duration: 2.5, y: 0, opacity: 1, skewX: 0, ease: "elastic.out(1, 0.3)" })
        .to(refs.sunRef.current, { duration: 2.5, scale: 1, opacity: 1, rotation: 0, ease: "elastic.out(1, 0.5)" }, "-=1.5")
        .to(refs.textGroupRef.current, { duration: 2, opacity: 1, y: 0, scale: 1, rotation: 0, filter: "blur(0px)", ease: "elastic.out(1, 0.3)" })
        .to(refs.ctaRef.current, { duration: 1.2, opacity: 1, y: 0, scale: 1, rotation: 0, filter: "blur(0px)", ease: "elastic.out(1, 0.3)" }, "-=0.8")
        .to(refs.scrollRef.current, { duration: 1, opacity: 1, y: 0, scale: 1, rotation: 0, filter: "blur(0px)", ease: "back.out(1.7)" }, "-=0.5");
      // Continuous animations
      gsap.to(refs.sunRef.current, { rotation: 360, duration: 25, repeat: -1, ease: "none" });
      gsap.to(refs.sunRef.current, { scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: "power2.inOut" });
      gsap.to(refs.scrollRef.current, { y: 15, duration: 2, repeat: -1, yoyo: true, ease: "power2.inOut" });
      gsap.to(refs.scrollRef.current, { boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)", duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });
      gsap.to(refs.textGroupRef.current, { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "power2.inOut", delay: 2 });
      // Animate logo reveal (draw effect)
      // (Assume PhechaanLogo supports a 'draw' prop for animation, or add a mask/clipPath)
      // Analytics placeholder
      (window as any).__intro_analytics = ((window as any).__intro_analytics || []);
      (window as any).__intro_analytics.push({ event: "intro_shown", ts: Date.now() });
      return () => tl.kill();
    });
  }, [isMobile, reducedMotion, refs]);
}

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
  const textGroupRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [announcement, setAnnouncement] = useState("");
  const [lang, setLang] = useState("en");
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const onSkip = useCallback(() => {
    localStorage.setItem("phechaan_intro_skipped", "1");
    setShowContent(true);
    onComplete();
  }, [onComplete]);

  // Focus management
  useEffect(() => {
    if (showContent && skipButtonRef.current) {
      skipButtonRef.current.focus();
    }
  }, [showContent]);

  // Theme toggle
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Localization
  const translations = {
    en: {
      start: "Start Your Journey",
      skip: "Skip",
      scroll: "Scroll to explore",
      mute: "Mute Sound",
      unmute: "Unmute Sound",
      announcement: "Intro complete. Main content loaded.",
    },
    hi: {
      start: "अपनी यात्रा शुरू करें",
      skip: "छोड़ें",
      scroll: "एक्सप्लोर करने के लिए स्क्रॉल करें",
      mute: "ध्वनि बंद करें",
      unmute: "ध्वनि चालू करें",
      announcement: "परिचय पूरा। मुख्य सामग्री लोड हो गई।",
    },
  };
  const t = translations[lang];

  // Announce intro completion
  useEffect(() => {
    if (showContent) setAnnouncement(t.announcement);
  }, [showContent, t]);

  // Parallax background effect
  useEffect(() => {
    const handleMove = (e) => {
      if (!introRef.current) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX) / window.innerWidth;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) / window.innerHeight;
      introRef.current.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  // Keyboard skip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" || e.key === "Enter") onSkip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSkip]);

  // Progress indicator
  useEffect(() => {
    if (showContent) return;
    let frame;
    let start = Date.now();
    const duration = 5000; // 5s
    function animate() {
      setProgress(Math.min(1, (Date.now() - start) / duration));
      if (Date.now() - start < duration) frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [showContent]);

  // LocalStorage skip
  useEffect(() => {
    if (localStorage.getItem("phechaan_intro_skipped")) {
      setShowContent(true);
      onComplete();
    }
  }, [onComplete]);

  // Play sound effect at the start of the intro
  useEffect(() => {
    if (!muted && !reducedMotion && !localStorage.getItem("phechaan_intro_skipped")) {
      const audio = new Audio("/chime.mp3");
      audio.volume = 0.5;
      audio.play();
    }
  }, [muted, reducedMotion]);

  // Sound effect (placeholder)
  const playSound = useCallback(() => {
    if (!muted) {
      // Play a gentle chime (add your own sound file)
      // new Audio('/chime.mp3').play();
    }
  }, [muted]);

  // Animation logic
  useAnimatedIntro({
    refs: { introRef, mountainsRef, sunRef, textGroupRef, ctaRef, scrollRef, setShowContent },
    isMobile,
    reducedMotion,
    onComplete,
    onSkip,
  });

  // Show a loading spinner if the intro is not ready
  if (!showContent && progress === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-phechaan-gold"></div>
      </div>
    );
  }

  return (
    <div
      ref={introRef}
      className={`fixed inset-0 z-50 bg-gradient-to-b from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze overflow-hidden ${theme === "light" ? "theme-light" : "theme-dark"}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Parallax/animated background handled by useEffect */}
      <div className="flex flex-col items-center justify-center h-full text-center px-2 sm:px-4">
        {/* Text Group: Logo, Heading, Taglines */}
        <div ref={textGroupRef} className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
            <PhechaanLogo size={isMobile ? 64 : 96} className="w-full h-full" /*draw={true}*/ />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-phechaan-gold mb-2 sm:mb-4">
            Phechaan
          </h1>
          <div className="mb-8 sm:mb-12">
            <p className="text-lg sm:text-2xl md:text-3xl text-phechaan-cream font-light">
              Rediscover Your Roots...
            </p>
            <p className="text-base sm:text-lg md:text-xl text-phechaan-cream/80 mt-1 sm:mt-2">
              Explore India the Real Way
            </p>
          </div>
        </div>
        {/* CTA Button */}
        <div ref={ctaRef} className="mb-10 sm:mb-16">
          <button
            onClick={onComplete}
            className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            aria-label={t.start}
          >
            {t.start}
          </button>
        </div>
        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          onClick={onComplete}
          className="cursor-pointer flex flex-col items-center text-phechaan-cream/60 hover:text-phechaan-cream transition-colors duration-300 group"
          tabIndex={0}
          aria-label={t.scroll}
        >
          <span className="text-xs sm:text-sm mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
            {t.scroll}
          </span>
          <div className="relative">
            <ChevronDown
              size={isMobile ? 24 : 32}
              className="group-hover:scale-125 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-phechaan-gold/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-40 h-2 bg-phechaan-gold/20 rounded-full mt-6 mx-auto overflow-hidden">
          <div className="h-full bg-phechaan-gold rounded-full" style={{ width: `${progress * 100}%` }} />
        </div>
        {/* Mute Button */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="mt-4 text-xs text-phechaan-cream/60 hover:text-phechaan-gold transition-colors"
          aria-label={muted ? t.unmute : t.mute}
        >
          {muted ? t.unmute : t.mute}
        </button>
      </div>
      {/* Skip Button */}
      {showContent && (
        <button
          ref={skipButtonRef}
          onClick={onComplete}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 text-phechaan-cream/60 hover:text-phechaan-cream transition-colors text-sm sm:text-base"
          aria-label={t.skip}
        >
          {t.skip}
        </button>
      )}
      {/* Screen reader announcement */}
      <div aria-live="polite" className="sr-only">{announcement}</div>
      {/* PWA manifest & service worker placeholder (add in public/manifest.json and register sw.js) */}
    </div>
  );
}
