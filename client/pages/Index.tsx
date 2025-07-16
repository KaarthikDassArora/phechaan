import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import AnimatedIntro from "@/components/AnimatedIntro";
import Navigation from "@/components/Navigation";
import USPSectionFixed from "@/components/USPSectionFixed";
import FloatingElements from "@/components/FloatingElements";
import PhechaanLogo from "@/components/PhechaanLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Leaf,
  Users,
  Camera,
  Mountain,
  Heart,
  Star,
  ChevronRight,
  Sparkles,
  Compass,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  useSmoothScrollToTop();
  const [showIntro, setShowIntro] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutCardsRef = useRef<HTMLDivElement>(null);
  const whyCardsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showIntro) {
      // Enhanced hero with 3D parallax and morphing effects
      gsap.to(heroRef.current, {
        yPercent: -50,
        rotationX: 5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Create floating elements animation
      const createFloatingElements = () => {
        for (let i = 0; i < 20; i++) {
          const element = document.createElement("div");
          element.className =
            "absolute w-2 h-2 bg-phechaan-gold/30 rounded-full";
          element.style.left = Math.random() * 100 + "%";
          element.style.top = Math.random() * 100 + "%";
          heroRef.current?.appendChild(element);

          gsap.to(element, {
            y: -100,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
            duration: Math.random() * 5 + 3,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "power2.out",
          });
        }
      };
      createFloatingElements();

      // About cards with spectacular morphing animation
      gsap.fromTo(
        aboutCardsRef.current?.children || [],
        {
          scale: 0,
          rotation: 180,
          skewX: 45,
          opacity: 0,
          filter: "blur(20px) hue-rotate(180deg)",
        },
        {
          scale: 1,
          rotation: 0,
          skewX: 0,
          opacity: 1,
          filter: "blur(0px) hue-rotate(0deg)",
          duration: 1.5,
          stagger: 0.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: aboutCardsRef.current,
            start: "top 80%",
          },
        },
      );

      // Why cards with 3D flip animation
      gsap.fromTo(
        whyCardsRef.current?.children || [],
        {
          rotationY: 90,
          scale: 0.5,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: whyCardsRef.current,
            start: "top 80%",
          },
        },
      );

      // Testimonial with sliding morphing effect
      gsap.fromTo(
        testimonialRef.current,
        {
          x: -200,
          opacity: 0,
          skewX: 25,
          filter: "blur(10px)",
        },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
          },
        },
      );

      // CTA with pulsing energy effect
      gsap.fromTo(
        ctaRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
        },
      );

      // Add continuous floating animation to cards
      const cards = [
        ...(aboutCardsRef.current?.children || []),
        ...(whyCardsRef.current?.children || []),
      ];
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: -15,
          duration: 3 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3,
        });
      });
    }
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <AnimatedIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-gradient-to-br from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <FloatingElements count={30} color="phechaan-gold" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="text-phechaan-gold animate-pulse" size={32} />
            <h1 className="text-5xl md:text-7xl font-bold text-phechaan-gold">
              Explore India
            </h1>
            <Sparkles className="text-phechaan-gold animate-pulse" size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-phechaan-cream mb-6">
            the Real Way
          </h2>
          <p className="text-xl md:text-2xl text-phechaan-cream/90 mb-8 max-w-2xl mx-auto">
            Discover authentic experiences, support local communities, and
            create memories that last a lifetime through sustainable
            eco-tourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-phechaan-gold/25"
            >
              <Compass className="mr-2" size={20} />
              Plan Your Trip
              <ChevronRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-phechaan-gold text-phechaan-gold hover:bg-phechaan-gold hover:text-phechaan-deep-earth text-lg px-8 transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="mr-2" size={20} />
              Watch Stories
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-4">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect travelers with authentic Indian experiences while
              supporting local communities and preserving cultural heritage.
            </p>
          </div>
          <div
            ref={aboutCardsRef}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-phechaan-gold/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-phechaan-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-phechaan-gold/20 transition-colors">
                  <MapPin className="text-phechaan-gold" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Hidden Destinations
                </h3>
                <p className="text-muted-foreground">
                  Discover off-the-beaten-path locations that showcase India's
                  diverse beauty and rich cultural tapestry.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-phechaan-gold/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-phechaan-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-phechaan-gold/20 transition-colors">
                  <Users className="text-phechaan-gold" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Community Focus
                </h3>
                <p className="text-muted-foreground">
                  Support local communities by staying in homestays, eating
                  traditional food, and learning from local guides.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-phechaan-gold/30">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-phechaan-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-phechaan-gold/20 transition-colors">
                  <Leaf className="text-phechaan-gold" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Sustainable Travel
                </h3>
                <p className="text-muted-foreground">
                  Travel responsibly with minimal environmental impact while
                  maximizing positive social and economic benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <USPSectionFixed />

      {/* Why Eco-Tourism Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-4">
              Why Eco-Tourism?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience travel that makes a positive impact on people, places,
              and the planet.
            </p>
          </div>
          <div
            ref={whyCardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Mountain,
                title: "Preserve Nature",
                description:
                  "Protect pristine landscapes for future generations",
              },
              {
                icon: Heart,
                title: "Cultural Exchange",
                description: "Connect authentically with local traditions",
              },
              {
                icon: Users,
                title: "Empower Communities",
                description: "Create sustainable livelihoods for locals",
              },
              {
                icon: Camera,
                title: "Capture Memories",
                description:
                  "Document your journey with meaningful experiences",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-phechaan-gold/30 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-phechaan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-phechaan-gold/20 transition-colors">
                    <item.icon className="text-phechaan-gold" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div
            ref={testimonialRef}
            className="bg-gradient-to-r from-phechaan-gold/10 to-transparent rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-phechaan-gold fill-current"
                  size={24}
                />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-light text-foreground mb-6 italic">
              "Phechaan showed us the India we never knew existed. The
              authenticity of experiences and the warmth of communities we met
              made this journey truly transformational."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-phechaan-gold rounded-full flex items-center justify-center mr-4">
                <span className="text-phechaan-deep-earth font-semibold">
                  AR
                </span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Anita Raj</div>
                <div className="text-muted-foreground">
                  Sustainable Travel Enthusiast
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto text-center">
          <div ref={ctaRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-phechaan-cream/90 mb-8 max-w-2xl mx-auto">
              Join thousands of conscious travelers who have discovered the real
              India through our carefully curated experiences.
            </p>
            <Button
              size="lg"
              className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8 animate-pulse"
            >
              Plan Your Trip Today
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-phechaan-deep-earth text-phechaan-cream py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <PhechaanLogo size={32} className="mr-3" />
                <span className="text-2xl font-bold text-phechaan-gold">
                  Phechaan
                </span>
              </div>
              <p className="text-phechaan-cream/70 mb-4 leading-relaxed">
                Explore India the Real Way through authentic experiences and
                sustainable tourism.
              </p>
              <p className="text-sm text-phechaan-cream/50">
                Ludhiana, Punjab, India
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-phechaan-gold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/destinations"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a
                    href="/packages"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    Packages
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-phechaan-cream/70 hover:text-phechaan-gold transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-phechaan-gold mb-4">
                Our Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-phechaan-cream/70">Cultural Tours</span>
                </li>
                <li>
                  <span className="text-phechaan-cream/70">Eco-Tourism</span>
                </li>
                <li>
                  <span className="text-phechaan-cream/70">
                    Adventure Travel
                  </span>
                </li>
                <li>
                  <span className="text-phechaan-cream/70">Heritage Sites</span>
                </li>
                <li>
                  <span className="text-phechaan-cream/70">
                    Community Tourism
                  </span>
                </li>
                <li>
                  <span className="text-phechaan-cream/70">
                    Custom Packages
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-phechaan-gold mb-4">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="text-phechaan-gold mt-1" size={16} />
                  <div className="text-phechaan-cream/70 text-sm">
                    123 Heritage Lane
                    <br />
                    Model Town, Ludhiana
                    <br />
                    Punjab - 141002
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-phechaan-gold">📞</span>
                  <span className="text-phechaan-cream/70 text-sm">
                    +91 161 2345 6789
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-phechaan-gold">✉️</span>
                  <span className="text-phechaan-cream/70 text-sm">
                    hello@phechaan.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-phechaan-cream/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-phechaan-cream/50 mb-4 md:mb-0">
                © 2025 Phechaan. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-phechaan-cream/50 hover:text-phechaan-gold text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-phechaan-cream/50 hover:text-phechaan-gold text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-phechaan-cream/50 hover:text-phechaan-gold text-sm transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
