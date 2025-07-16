import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Heart,
  Palette,
  Leaf,
  DollarSign,
  Globe,
  Mountain,
  Users,
  Camera,
  Award,
  Star,
  Compass,
  TreePine,
  Waves,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const uspData = [
  {
    id: 1,
    title: "Discovering India's Untold Corners",
    subtitle:
      "See the India that mainstream maps miss, but stories never forget.",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    highlights: [
      {
        title: "Hikkim, Himachal Pradesh",
        desc: "World's highest post office, as recognized by India Post",
        icon: Mountain,
      },
      {
        title: "Lonar Lake, Maharashtra",
        desc: "Rare meteoric crater and National Geo-Heritage Monument",
        icon: Waves,
      },
      {
        title: "Ziro Valley, Arunachal Pradesh",
        desc: "Indigenous life where traditions thrive untouched",
        icon: TreePine,
      },
    ],
  },
  {
    id: 2,
    title: "Celebrating India's Unsung Heroes",
    subtitle: "Honoring lives lived in silence, strength, and spirit.",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    highlights: [
      {
        title: "Drass, Ladakh",
        desc: "Second coldest inhabited place in the world",
        icon: Mountain,
      },
      {
        title: "Changpa People, Ladakh",
        desc: "Nomadic culture known for resilience and pashmina trade",
        icon: Users,
      },
      {
        title: "Mawlynnong, Meghalaya",
        desc: "Asia's Cleanest Village, sustained by grassroots effort",
        icon: Leaf,
      },
    ],
  },
  {
    id: 3,
    title: "Cultural Immersion Beyond Sightseeing",
    subtitle: "Where travel means belonging, not just visiting.",
    icon: Palette,
    color: "from-purple-500 to-indigo-500",
    highlights: [
      {
        title: "Madhubani Painting, Bihar",
        desc: "Learn from the artists themselves",
        icon: Palette,
      },
      {
        title: "Shepherd Families, Lahaul–Spiti",
        desc: "Experience authentic rural life",
        icon: Users,
      },
      {
        title: "Starlit Storytelling",
        desc: "Experiencing traditions, not just observing them",
        icon: Star,
      },
    ],
  },
  {
    id: 4,
    title: "Sustainable by Design",
    subtitle: "Travel that leaves memories, not marks.",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    highlights: [
      {
        title: "Eco-Friendly Transport",
        desc: "Local accommodations and responsible guiding",
        icon: Compass,
      },
      {
        title: "Community Investment",
        desc: "Profits dedicated to rural sustainability efforts",
        icon: Heart,
      },
      {
        title: "Environmental Respect",
        desc: "Model that respects nature and empowers locals",
        icon: Globe,
      },
    ],
  },
  {
    id: 5,
    title: "Affordable, Yet Enriching",
    subtitle: "Real discovery shouldn't come at an impossible cost.",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
    highlights: [
      {
        title: "Community Partnerships",
        desc: "Cut costs through local connections",
        icon: Users,
      },
      {
        title: "Value with Impact",
        desc: "Economically accessible and emotionally enriching",
        icon: Award,
      },
      {
        title: "For Everyone",
        desc: "Students, families, and solo travelers welcome",
        icon: Heart,
      },
    ],
  },
  {
    id: 6,
    title: "Rooted in India's Soul",
    subtitle: "We don't follow trends — we follow tradition.",
    icon: Globe,
    color: "from-amber-500 to-red-500",
    highlights: [
      {
        title: "Bishnupur, West Bengal",
        desc: "Terracotta temples and living heritage",
        icon: Mountain,
      },
      {
        title: "Nongriat, Meghalaya",
        desc: "Living root bridges and tribal rhythms",
        icon: TreePine,
      },
      {
        title: "Rann of Kachchh, Gujarat",
        desc: "Untouched by mass tourism",
        icon: Waves,
      },
    ],
  },
];

export default function USPSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to ensure proper setup
      ScrollTrigger.refresh();

      // Main title with spectacular entrance
      gsap.fromTo(
        titleRef.current,
        {
          scale: 0,
          rotation: 360,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards with mind-blowing 3D morphing animation
      const cards = gsap.utils.toArray(cardsRef.current?.children || []);

      cards.forEach((card: any, index) => {
        // Initial state - cards morph from geometric shapes
        gsap.set(card, {
          scale: 0,
          rotation: index % 2 === 0 ? 180 : -180,
          skewX: 45,
          skewY: 25,
          opacity: 0,
          transformOrigin: "center center",
          filter: "blur(20px) hue-rotate(180deg)",
        });

        // Create a timeline for each card with better scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        // Morph into view with spectacular effects
        tl.to(card, {
          scale: 1,
          rotation: 0,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          filter: "blur(0px) hue-rotate(0deg)",
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: index * 0.2,
        })
          // Add floating animation
          .to(
            card,
            {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            },
            "-=0.5",
          )
          // Add subtle rotation on hover
          .set(card, {
            onHover: () => {
              gsap.to(card, {
                rotationY: 15,
                rotationX: 5,
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onHoverOut: () => {
              gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });

        // Animate highlights with particle effect
        const highlights = card.querySelectorAll("[data-highlight]");
        highlights.forEach((highlight: any, hIndex: number) => {
          gsap.fromTo(
            highlight,
            {
              x: hIndex % 2 === 0 ? -100 : 100,
              opacity: 0,
              scale: 0.8,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: 0.5 + hIndex * 0.1,
              ease: "elastic.out(1, 0.3)",
              scrollTrigger: {
                trigger: highlight,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        // Icon animations with spectacular effects
        const icon = card.querySelector("[data-icon]");
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none",
          });

          // Subtle scale effect
          gsap.to(icon, {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }
      });

      // Subtle background animation (no particles)

      // Background morphing gradient animation
      gsap.to(containerRef.current, {
        backgroundPosition: "200% 200%",
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      // Ensure ScrollTrigger is properly initialized
      ScrollTrigger.addEventListener("refresh", () => {
        console.log("ScrollTrigger refreshed");
      });
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: `
          linear-gradient(45deg, 
            hsl(var(--phechaan-deep-earth)) 0%, 
            hsl(var(--phechaan-earth)) 25%, 
            hsl(var(--phechaan-bronze)) 50%, 
            hsl(var(--phechaan-gold)) 75%, 
            hsl(var(--phechaan-deep-earth)) 100%
          )`,
        backgroundSize: "400% 400%",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-64 h-64 bg-phechaan-gold rounded-full blur-3xl"
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-phechaan-bronze rounded-full blur-3xl"
          style={{
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-20">
          <Badge className="bg-phechaan-gold/20 text-phechaan-gold border-phechaan-gold/30 text-lg px-6 py-3 mb-6">
            🌟 Our Unique Promise
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-phechaan-cream mb-6">
            <span className="bg-gradient-to-r from-phechaan-gold to-phechaan-bronze bg-clip-text text-transparent">
              Unexplored India,
            </span>
            <br />
            <span className="text-phechaan-cream">Within Reach</span>
          </h2>
          <p className="text-2xl md:text-3xl text-phechaan-cream/80 font-light">
            Affordable. Authentic. Respectful.
          </p>
        </div>

        {/* USP Cards */}
        <div
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
        >
          {uspData.map((usp, index) => {
            const IconComponent = usp.icon;
            return (
              <Card
                key={usp.id}
                className="group border-none bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg hover:from-background/95 hover:to-background/80 transition-all duration-500 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${usp.color.split(" ")[0].replace("from-", "hsl(var(--")})/10, ${usp.color.split(" ")[1].replace("to-", "hsl(var(--")})/10)`,
                }}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div
                      data-icon
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${usp.color} flex items-center justify-center shadow-2xl`}
                    >
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {usp.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {usp.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-6">
                    {usp.highlights.map((highlight, hIndex) => {
                      const HighlightIcon = highlight.icon;
                      return (
                        <div
                          key={hIndex}
                          data-highlight
                          className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-transparent hover:from-muted/70 transition-all duration-300"
                        >
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${usp.color} flex items-center justify-center shadow-lg`}
                          >
                            <HighlightIcon className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">
                              {highlight.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {highlight.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-phechaan-gold/20 to-phechaan-bronze/20 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border border-phechaan-gold/30">
            <h3 className="text-3xl md:text-4xl font-bold text-phechaan-cream mb-4">
              Ready to Discover the Real India?
            </h3>
            <p className="text-xl text-phechaan-cream/80 mb-8">
              Join thousands who have experienced India's authentic beauty
              through our eyes.
            </p>
            <button className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
}
