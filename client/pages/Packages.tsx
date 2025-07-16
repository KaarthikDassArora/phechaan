import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Star,
  Clock,
  Users,
  MapPin,
  Camera,
  Utensils,
  Bed,
  Car,
  Mountain,
  Leaf,
  Heart,
  Shield,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const packageCategories = [
  { id: "adventure", name: "Adventure", icon: Mountain },
  { id: "cultural", name: "Cultural", icon: Heart },
  { id: "eco", name: "Eco-Tourism", icon: Leaf },
  { id: "family", name: "Family", icon: Users },
];

const packages = {
  adventure: [
    {
      id: 1,
      name: "Himalayan Odyssey",
      duration: "10 Days",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: 4.9,
      reviews: 127,
      difficulty: "Challenging",
      groupSize: "6-12 people",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      locations: ["Spiti Valley", "Kinnaur", "Sangla"],
      highlights: [
        "High-altitude monasteries",
        "Camping under star-lit skies",
        "Traditional Tibetan villages",
        "Fossil hunting expedition",
        "Local guide throughout",
      ],
      includes: ["Accommodation", "All meals", "Transportation", "Guide"],
      featured: true,
    },
    {
      id: 2,
      name: "Western Ghats Trek",
      duration: "7 Days",
      price: "₹28,000",
      originalPrice: "₹35,000",
      rating: 4.7,
      reviews: 89,
      difficulty: "Moderate",
      groupSize: "8-15 people",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
      locations: ["Munnar", "Thekkady", "Kumily"],
      highlights: [
        "Tea plantation walks",
        "Spice garden tours",
        "Wildlife sanctuary visit",
        "Ayurvedic treatments",
        "Backwater cruise",
      ],
      includes: ["Homestay", "Local cuisine", "Guided tours", "Activities"],
      featured: false,
    },
  ],
  cultural: [
    {
      id: 3,
      name: "Rajasthan Heritage",
      duration: "8 Days",
      price: "₹35,000",
      originalPrice: "₹42,000",
      rating: 4.8,
      reviews: 156,
      difficulty: "Easy",
      groupSize: "10-20 people",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500",
      locations: ["Jaisalmer", "Jodhpur", "Rural Villages"],
      highlights: [
        "Desert camping experience",
        "Traditional folk performances",
        "Handicraft workshops",
        "Local family dinners",
        "Camel safari",
      ],
      includes: [
        "Heritage hotels",
        "Cultural shows",
        "Transport",
        "Activities",
      ],
      featured: true,
    },
    {
      id: 4,
      name: "Bengal Cultural Trail",
      duration: "6 Days",
      price: "₹22,000",
      originalPrice: "₹28,000",
      rating: 4.6,
      reviews: 73,
      difficulty: "Easy",
      groupSize: "6-12 people",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
      locations: ["Kolkata", "Shantiniketan", "Bishnupur"],
      highlights: [
        "Tagore's university visit",
        "Terracotta temple tours",
        "Traditional art workshops",
        "Local music sessions",
        "Street food exploration",
      ],
      includes: ["Boutique stays", "Workshop fees", "Local transport", "Meals"],
      featured: false,
    },
  ],
  eco: [
    {
      id: 5,
      name: "Sundarbans Expedition",
      duration: "5 Days",
      price: "₹32,000",
      originalPrice: "₹38,000",
      rating: 4.9,
      reviews: 94,
      difficulty: "Moderate",
      groupSize: "8-12 people",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=500",
      locations: ["Sundarbans", "Mangrove Forests", "Tiger Reserve"],
      highlights: [
        "Royal Bengal Tiger spotting",
        "Mangrove ecosystem study",
        "Traditional fishing villages",
        "Bird watching expeditions",
        "Conservation workshops",
      ],
      includes: [
        "Eco-lodges",
        "Boat safaris",
        "Expert naturalist",
        "Equipment",
      ],
      featured: true,
    },
    {
      id: 6,
      name: "Silent Valley Experience",
      duration: "4 Days",
      price: "₹25,000",
      originalPrice: "₹30,000",
      rating: 4.7,
      reviews: 61,
      difficulty: "Easy",
      groupSize: "6-10 people",
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c783?w=500",
      locations: ["Silent Valley", "Nilgiri Hills", "Tribal Villages"],
      highlights: [
        "Pristine rainforest exploration",
        "Endemic species spotting",
        "Tribal culture immersion",
        "Organic farming experience",
        "Meditation sessions",
      ],
      includes: [
        "Eco-cottages",
        "Organic meals",
        "Nature guides",
        "Activities",
      ],
      featured: false,
    },
  ],
  family: [
    {
      id: 7,
      name: "Goa Beyond Beaches",
      duration: "6 Days",
      price: "₹24,000",
      originalPrice: "₹30,000",
      rating: 4.5,
      reviews: 118,
      difficulty: "Easy",
      groupSize: "Family groups",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
      locations: ["Old Goa", "Spice Plantations", "Backwaters"],
      highlights: [
        "Portuguese heritage sites",
        "Spice plantation tours",
        "Traditional cooking classes",
        "Backwater boat rides",
        "Local market visits",
      ],
      includes: [
        "Family rooms",
        "Kid-friendly meals",
        "Transport",
        "Activities",
      ],
      featured: true,
    },
    {
      id: 8,
      name: "Mysore Palace Circuit",
      duration: "5 Days",
      price: "₹20,000",
      originalPrice: "₹25,000",
      rating: 4.6,
      reviews: 85,
      difficulty: "Easy",
      groupSize: "Families welcome",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      locations: ["Mysore", "Srirangapatna", "Nagarhole"],
      highlights: [
        "Royal palace tours",
        "Silk weaving workshops",
        "Wildlife sanctuary visit",
        "Traditional games",
        "Cultural performances",
      ],
      includes: ["Heritage hotels", "Family activities", "Transport", "Guides"],
      featured: false,
    },
  ],
};

const features = [
  {
    icon: Shield,
    title: "100% Safe & Secure",
    description: "Comprehensive insurance and safety protocols",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Knowledgeable guides from local communities",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Travel",
    description: "Sustainable practices throughout your journey",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Your trip directly benefits local communities",
  },
];

export default function Packages() {
  useSmoothScrollToTop();
  const [activeCategory, setActiveCategory] = useState("adventure");
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    // Features animation
    gsap.fromTo(
      featuresRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  useEffect(() => {
    // Animate packages when category changes
    gsap.fromTo(
      packagesRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-phechaan-deep-earth via-phechaan-earth to-phechaan-bronze opacity-90"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 container mx-auto px-4">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-phechaan-gold mb-6">
              Tour Packages
            </h1>
            <p className="text-xl md:text-2xl text-phechaan-cream/90 mb-8 max-w-3xl mx-auto">
              Carefully curated experiences designed to create meaningful
              connections with India's diverse landscapes and cultures. Every
              package supports local communities and sustainable tourism.
            </p>
            <div className="flex justify-center">
              <Badge className="bg-phechaan-gold text-phechaan-deep-earth text-lg px-6 py-2">
                Starting from ₹20,000
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Why Choose Our Packages?
          </h2>
          <div
            ref={featuresRef}
            className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 border-border/50 hover:border-phechaan-gold/30"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-phechaan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-phechaan-gold" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Our Packages
          </h2>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-16">
              {packageCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <IconComponent size={16} />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {packageCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div
                  ref={packagesRef}
                  className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                  {packages[category.id as keyof typeof packages].map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-phechaan-gold/30 overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {pkg.featured && (
                          <Badge className="absolute top-3 left-3 bg-phechaan-gold text-phechaan-deep-earth">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <Star
                            className="text-phechaan-gold fill-current"
                            size={14}
                          />
                          <span className="text-sm font-medium">
                            {pkg.rating}
                          </span>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl text-foreground group-hover:text-phechaan-gold transition-colors">
                          {pkg.name}
                        </CardTitle>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{pkg.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{pkg.groupSize}</span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-phechaan-gold/30 text-phechaan-gold"
                          >
                            {pkg.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {pkg.locations.map((location, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 text-sm text-muted-foreground"
                            >
                              <MapPin size={12} />
                              <span>{location}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Highlights:
                          </h4>
                          <ul className="space-y-1">
                            {pkg.highlights
                              .slice(0, 3)
                              .map((highlight, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                  <Check
                                    className="text-phechaan-gold flex-shrink-0"
                                    size={14}
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Includes:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {pkg.includes.map((item, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-phechaan-gold/10 text-phechaan-gold border-phechaan-gold/20"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-phechaan-gold">
                                {pkg.price}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                {pkg.originalPrice}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              per person • {pkg.reviews} reviews
                            </div>
                          </div>
                          <Button className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth">
                            Book Now
                            <ChevronRight className="ml-2" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-6">
            Need Something Different?
          </h2>
          <p className="text-xl text-phechaan-cream/90 mb-8">
            Our travel experts can design a completely customized package based
            on your interests, budget, and travel dates. Every custom trip
            maintains our commitment to sustainable and community-focused
            tourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8"
            >
              Design Custom Package
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-phechaan-cream text-phechaan-cream hover:bg-phechaan-cream hover:text-phechaan-deep-earth text-lg px-8"
            >
              Speak to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-phechaan-gold mb-12">
            Simple Booking Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Package",
                description:
                  "Select from our curated packages or request custom",
                icon: MapPin,
              },
              {
                step: "2",
                title: "Secure Booking",
                description: "Easy online payment with flexible cancellation",
                icon: Shield,
              },
              {
                step: "3",
                title: "Start Journey",
                description:
                  "Meet your guide and begin your authentic experience",
                icon: Heart,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="w-16 h-16 bg-phechaan-gold text-phechaan-deep-earth rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    {item.step}
                  </div>
                  <IconComponent
                    className="text-phechaan-gold mx-auto"
                    size={32}
                  />
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
