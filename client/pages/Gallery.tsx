import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  MapPin,
  Calendar,
  User,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", name: "All Photos" },
  { id: "landscapes", name: "Landscapes" },
  { id: "culture", name: "Culture & People" },
  { id: "wildlife", name: "Wildlife" },
  { id: "heritage", name: "Heritage Sites" },
  { id: "festivals", name: "Festivals" },
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    category: "landscapes",
    title: "Spiti Valley Sunrise",
    location: "Himachal Pradesh",
    date: "March 2024",
    photographer: "Arjun Sharma",
    description:
      "The golden hour transforms the barren landscape of Spiti Valley into a canvas of warm hues, with ancient monasteries perched on clifftops.",
    likes: 234,
    height: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    category: "heritage",
    title: "Hampi Stone Chariot",
    location: "Karnataka",
    date: "February 2024",
    photographer: "Priya Nair",
    description:
      "The iconic stone chariot at Vittala Temple stands as a testament to the architectural brilliance of the Vijayanagara Empire.",
    likes: 189,
    height: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    category: "culture",
    title: "Majuli Island Weaver",
    location: "Assam",
    date: "January 2024",
    photographer: "Rajesh Kumar",
    description:
      "A traditional weaver at work on Majuli Island, preserving centuries-old techniques passed down through generations.",
    likes: 156,
    height: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
    category: "wildlife",
    title: "Asiatic Lion Pride",
    location: "Gir National Park, Gujarat",
    date: "December 2023",
    photographer: "Wildlife Team",
    description:
      "A majestic Asiatic lion family resting in their natural habitat, representing successful conservation efforts.",
    likes: 312,
    height: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    category: "landscapes",
    title: "Munnar Tea Gardens",
    location: "Kerala",
    date: "November 2023",
    photographer: "Local Guide",
    description:
      "Rolling hills covered in emerald tea bushes create a mesmerizing pattern across the Western Ghats.",
    likes: 267,
    height: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    category: "heritage",
    title: "Jaisalmer Fort",
    location: "Rajasthan",
    date: "October 2023",
    photographer: "Heritage Team",
    description:
      "The golden fort of Jaisalmer rises from the Thar Desert like a mirage, its sandstone walls glowing in the evening light.",
    likes: 198,
    height: "tall",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    category: "culture",
    title: "Goan Spice Market",
    location: "Goa",
    date: "September 2023",
    photographer: "Cultural Team",
    description:
      "Vibrant spices and local produce create a feast for the senses in this traditional Goan market.",
    likes: 143,
    height: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    category: "heritage",
    title: "Mysore Palace",
    location: "Karnataka",
    date: "August 2023",
    photographer: "Architecture Team",
    description:
      "The illuminated Mysore Palace showcases Indo-Saracenic architecture at its finest during the evening light show.",
    likes: 221,
    height: "normal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1520637736862-4d197d17c783?w=800",
    category: "landscapes",
    title: "Silent Valley Mist",
    location: "Kerala",
    date: "July 2023",
    photographer: "Eco Team",
    description:
      "Morning mist rises from the pristine rainforest of Silent Valley, one of India's last undisturbed tropical forests.",
    likes: 178,
    height: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    category: "festivals",
    title: "Himalayan Festival",
    location: "Ladakh",
    date: "June 2023",
    photographer: "Festival Team",
    description:
      "Masked dancers perform traditional Cham dance during a monastery festival in the high Himalayas.",
    likes: 289,
    height: "normal",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1539650116574-75c0c6d73200?w=800",
    category: "wildlife",
    title: "Bengal Tiger",
    location: "Sundarbans, West Bengal",
    date: "May 2023",
    photographer: "Conservation Team",
    description:
      "A Royal Bengal Tiger captured during our conservation expedition in the mangrove forests of Sundarbans.",
    likes: 356,
    height: "tall",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    category: "culture",
    title: "Tribal Elder",
    location: "Chhattisgarh",
    date: "April 2023",
    photographer: "Cultural Team",
    description:
      "A wise tribal elder shares stories of traditional life in the heart of India's forests.",
    likes: 167,
    height: "normal",
  },
];

export default function Gallery() {
  useSmoothScrollToTop();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === selectedCategory);
    setFilteredImages(filtered);

    // Animate gallery when category changes
    gsap.fromTo(
      galleryRef.current?.children || [],
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
      },
    );
  }, [selectedCategory]);

  const openLightbox = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

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
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 container mx-auto px-4">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-phechaan-gold mb-6">
              Visual Stories
            </h1>
            <p className="text-xl md:text-2xl text-phechaan-cream/90 mb-8 max-w-3xl mx-auto">
              Discover the beauty of India through the lens of our travelers and
              local photographers. Each image tells a story of authentic
              experiences and cultural connections.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-phechaan-cream/80">
                <Camera size={20} />
                <span>{galleryImages.length} Photos</span>
              </div>
              <div className="flex items-center gap-2 text-phechaan-cream/80">
                <MapPin size={20} />
                <span>12 Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div ref={filtersRef} className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-phechaan-gold text-phechaan-deep-earth"
                    : "hover:bg-phechaan-gold/10"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div
            ref={galleryRef}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 max-w-7xl mx-auto"
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid ${
                  image.height === "tall" ? "h-96" : "h-64"
                } hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl`}
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                    <MapPin size={14} />
                    <span>{image.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <User size={14} />
                      <span>{image.photographer}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white/80">
                      <Heart size={14} />
                      <span>{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <Camera
                className="mx-auto text-muted-foreground mb-4"
                size={48}
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No photos found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-background border-border">
          {selectedImage && (
            <>
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <DialogHeader className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-xl font-semibold text-phechaan-gold">
                        {selectedImage.title}
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{selectedImage.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{selectedImage.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{selectedImage.photographer}</span>
                        </div>
                      </DialogDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Share2 size={16} className="mr-2" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </DialogHeader>

                {/* Image */}
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Buttons */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={() => navigateImage("prev")}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={() => navigateImage("next")}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-phechaan-gold/10 text-phechaan-gold border-phechaan-gold/20">
                      {
                        categories.find(
                          (cat) => cat.id === selectedImage.category,
                        )?.name
                      }
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="fill-current text-red-500" size={16} />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-phechaan-cream/90 mb-8">
            Have you traveled with us? Share your photos and become part of our
            visual story. The best submissions will be featured in our gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8"
            >
              Submit Photos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-phechaan-cream text-phechaan-cream hover:bg-phechaan-cream hover:text-phechaan-deep-earth text-lg px-8"
            >
              Photography Tips
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
