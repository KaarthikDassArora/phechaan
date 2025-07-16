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

export default function USPSectionFixed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );

      // Card animations
      const cards = gsap.utils.toArray(".usp-card");

      cards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );

        // Floating animation
        gsap.to(card, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5,
        });
      });

      // Background animation
      gsap.to(containerRef.current, {
        backgroundPosition: "200% 200%",
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze"
      style={{
        backgroundSize: "400% 400%",
      }}
    >
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
                className={`usp-card group border-none bg-background/90 backdrop-blur-lg hover:bg-background/95 transition-all duration-500 overflow-hidden`}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${usp.color} flex items-center justify-center shadow-xl`}
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
    </section>
  );
}
