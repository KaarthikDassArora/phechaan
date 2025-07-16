import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Users,
  Clock,
  Mountain,
  Waves,
  TreePine,
  Sun,
  Filter,
  Search,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const regions = [
  { id: "all", name: "All Regions", icon: MapPin },
  { id: "north", name: "North India", icon: Mountain },
  { id: "south", name: "South India", icon: TreePine },
  { id: "east", name: "East India", icon: Sun },
  { id: "west", name: "West India", icon: Waves },
];

const destinations = [
  {
    id: 1,
    name: "Spiti Valley",
    region: "north",
    location: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    rating: 4.8,
    reviews: 127,
    duration: "7-10 days",
    difficulty: "Moderate",
    highlights: ["Monasteries", "High Altitude Desert", "Stargazing"],
    description:
      "Experience the raw beauty of the Trans-Himalayan region with ancient monasteries, pristine landscapes, and warm local communities.",
    price: "₹25,000",
    featured: true,
  },
  {
    id: 2,
    name: "Hampi",
    region: "south",
    location: "Karnataka",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500",
    rating: 4.7,
    reviews: 203,
    duration: "4-6 days",
    difficulty: "Easy",
    highlights: ["Historical Ruins", "Rock Formations", "Sunrise Views"],
    description:
      "Explore the magnificent ruins of the Vijayanagara Empire amidst stunning boulder landscapes and ancient temples.",
    price: "₹18,000",
    featured: true,
  },
  {
    id: 3,
    name: "Majuli Island",
    region: "east",
    location: "Assam",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
    rating: 4.6,
    reviews: 89,
    duration: "3-5 days",
    difficulty: "Easy",
    highlights: ["River Island", "Satras", "Mask Making"],
    description:
      "Discover the world's largest river island with its unique culture, traditional arts, and peaceful monastery life.",
    price: "₹15,000",
    featured: false,
  },
  {
    id: 4,
    name: "Gir National Park",
    region: "west",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=500",
    rating: 4.9,
    reviews: 156,
    duration: "3-4 days",
    difficulty: "Easy",
    highlights: ["Asiatic Lions", "Wildlife Safari", "Conservation"],
    description:
      "Witness the majestic Asiatic lions in their natural habitat while supporting conservation efforts and local communities.",
    price: "₹22,000",
    featured: true,
  },
  {
    id: 5,
    name: "Valley of Flowers",
    region: "north",
    location: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    rating: 4.8,
    reviews: 134,
    duration: "6-8 days",
    difficulty: "Challenging",
    highlights: ["Alpine Flowers", "Trekking", "UNESCO Site"],
    description:
      "Trek through the UNESCO World Heritage site blooming with hundreds of wildflower species in pristine alpine meadows.",
    price: "₹28,000",
    featured: false,
  },
  {
    id: 6,
    name: "Munnar Hills",
    region: "south",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
    rating: 4.5,
    reviews: 178,
    duration: "4-5 days",
    difficulty: "Easy",
    highlights: ["Tea Plantations", "Misty Hills", "Spice Gardens"],
    description:
      "Immerse yourself in the rolling tea gardens and spice plantations while staying with local families in the Western Ghats.",
    price: "₹20,000",
    featured: false,
  },
];

export default function Destinations() {
  useSmoothScrollToTop();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    // Filters animation
    gsap.fromTo(
      filtersRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      },
    );

    // Cards animation with ScrollTrigger
    gsap.fromTo(
      cardsRef.current?.children || [],
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  useEffect(() => {
    let filtered = destinations;

    if (selectedRegion !== "all") {
      filtered = filtered.filter((dest) => dest.region === selectedRegion);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.highlights.some((highlight) =>
            highlight.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredDestinations(filtered);
  }, [selectedRegion, searchTerm]);

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
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-phechaan-gold mb-6">
              Hidden Gems
              <br />
              <span className="text-phechaan-cream">of India</span>
            </h1>
            <p className="text-xl md:text-2xl text-phechaan-cream/90 mb-8 max-w-3xl mx-auto">
              Discover authentic destinations across India's diverse regions.
              From pristine mountains to cultural heritage sites, find your
              perfect eco-adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            ref={filtersRef}
            className="flex flex-col md:flex-row gap-6 items-center justify-between"
          >
            {/* Region Filters */}
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => {
                const IconComponent = region.icon;
                return (
                  <Button
                    key={region.id}
                    variant={
                      selectedRegion === region.id ? "default" : "outline"
                    }
                    onClick={() => setSelectedRegion(region.id)}
                    className={`flex items-center gap-2 ${
                      selectedRegion === region.id
                        ? "bg-phechaan-gold text-phechaan-deep-earth"
                        : "hover:bg-phechaan-gold/10"
                    }`}
                  >
                    <IconComponent size={16} />
                    {region.name}
                  </Button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-phechaan-gold/50 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-phechaan-gold/30 overflow-hidden hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {destination.featured && (
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
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-phechaan-gold transition-colors">
                    {destination.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    <span>{destination.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {destination.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-phechaan-gold/10 text-phechaan-gold border-phechaan-gold/20"
                        >
                          {highlight}
                        </Badge>
                      ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{destination.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-lg font-semibold text-phechaan-gold">
                      {destination.price}
                      <span className="text-sm text-muted-foreground font-normal">
                        /person
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth"
                    >
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <Filter
                className="mx-auto text-muted-foreground mb-4"
                size={48}
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-6">
            Can't Find Your Perfect Destination?
          </h2>
          <p className="text-xl text-phechaan-cream/90 mb-8 max-w-2xl mx-auto">
            Our travel experts will craft a personalized itinerary based on your
            interests and preferences.
          </p>
          <Button
            size="lg"
            className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8"
          >
            Plan Custom Trip
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
