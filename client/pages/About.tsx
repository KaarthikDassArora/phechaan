import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import Navigation from "@/components/Navigation";
import PhechaanLogo from "@/components/PhechaanLogo";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Leaf,
  Users,
  Target,
  Award,
  MapPin,
  Calendar,
  TreePine,
  Mountain,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "2019",
    title: "The Vision Begins",
    description:
      "Founded with a mission to showcase India's hidden treasures while supporting local communities and preserving cultural heritage.",
    icon: Target,
  },
  {
    year: "2020",
    title: "First Community Partnership",
    description:
      "Established our first partnership with local communities in Spiti Valley, creating sustainable tourism opportunities.",
    icon: Users,
  },
  {
    year: "2021",
    title: "Eco-Tourism Certification",
    description:
      "Received official certification for sustainable tourism practices from the Ministry of Tourism, Government of India.",
    icon: Leaf,
  },
  {
    year: "2022",
    title: "Expanding Horizons",
    description:
      "Extended our reach to all four regions of India, curating unique experiences in over 50 hidden destinations.",
    icon: MapPin,
  },
  {
    year: "2023",
    title: "Award Recognition",
    description:
      "Honored with the 'Best Sustainable Tourism Initiative' award for our impact on rural communities and conservation efforts.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Digital Innovation",
    description:
      "Launched our digital platform to make authentic travel experiences more accessible while maintaining our community-first approach.",
    icon: Globe,
  },
];

const values = [
  {
    title: "Authentic Experiences",
    description:
      "We believe in genuine cultural exchanges that benefit both travelers and local communities.",
    icon: Heart,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Environmental Stewardship",
    description:
      "Every journey contributes to conservation efforts and sustainable practices in local ecosystems.",
    icon: TreePine,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Community Empowerment",
    description:
      "We prioritize partnerships that create lasting economic opportunities for local communities.",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Cultural Preservation",
    description:
      "Our travels help preserve traditional arts, crafts, and customs for future generations.",
    icon: Mountain,
    color: "bg-purple-500/10 text-purple-600",
  },
];

const stats = [
  { number: "50+", label: "Hidden Destinations", icon: MapPin },
  { number: "1000+", label: "Happy Travelers", icon: Users },
  { number: "25+", label: "Community Partners", icon: Heart },
  { number: "95%", label: "Satisfaction Rate", icon: Award },
];

const team = [
  {
    name: "Anuradha Arora",
    role: "Founder & Cultural Guide",
    description:
      "Born in Punjab, Anuradha has spent over 15 years exploring India's remote regions and building relationships with local communities.",
    expertise: "Cultural Heritage, Local Communities",
  },
];

export default function About() {
  useSmoothScrollToTop();
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    // Timeline animation
    gsap.fromTo(
      timelineRef.current?.children || [],
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      },
    );

    // Values animation
    gsap.fromTo(
      valuesRef.current?.children || [],
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      },
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current?.children || [],
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      },
    );

    // Team animation
    gsap.fromTo(
      teamRef.current?.children || [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze opacity-90"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8">
              <PhechaanLogo size={96} className="w-full h-full" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-phechaan-gold mb-6">
              Who We Are
            </h1>
            <p className="text-xl md:text-2xl text-phechaan-cream/90 max-w-3xl mx-auto">
              We are storytellers, cultural bridge-builders, and guardians of
              India's hidden treasures. Our mission is to create transformative
              travel experiences that honor local communities and preserve our
              rich heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            To rediscover India's authentic spirit by connecting conscious
            travelers with local communities, fostering cultural exchange, and
            promoting sustainable tourism that benefits everyone involved.
          </p>
          <div className="bg-gradient-to-r from-phechaan-gold/10 to-transparent rounded-3xl p-8 text-left">
            <blockquote className="text-2xl md:text-3xl font-light text-foreground italic">
              "Travel is not just about seeing new places; it's about seeing the
              world through new eyes and leaving it better than we found it."
            </blockquote>
            <cite className="block mt-4 text-phechaan-gold font-semibold">
              - Phechaan Philosophy
            </cite>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Our Journey
          </h2>
          <div ref={timelineRef} className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-6 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-phechaan-gold rounded-full flex items-center justify-center">
                      <IconComponent
                        className="text-phechaan-deep-earth"
                        size={24}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge className="bg-phechaan-gold text-phechaan-deep-earth">
                        {event.year}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Our Values
          </h2>
          <div
            ref={valuesRef}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-phechaan-gold/30"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${value.color}`}
                    >
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-16 text-center">
            Our Impact
          </h2>
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-phechaan-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-phechaan-gold" size={28} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-phechaan-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-phechaan-cream/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Meet Our Team
          </h2>
          <div
            ref={teamRef}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-phechaan-gold/30 text-center"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-phechaan-gold to-phechaan-dark-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-phechaan-deep-earth">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <div className="text-phechaan-gold font-medium mb-4">
                    {member.role}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-phechaan-gold/10 text-phechaan-gold border-phechaan-gold/20"
                  >
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-6">
            Join Our Story
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of a community that values authentic experiences, cultural
            preservation, and sustainable travel. Your journey with us
            contributes to a larger mission of responsible tourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Plan Your Journey
            </button>
            <button className="border border-phechaan-gold text-phechaan-gold hover:bg-phechaan-gold hover:text-phechaan-deep-earth px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
