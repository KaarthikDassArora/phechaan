import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollToTop } from "@/hooks/use-smooth-scroll-top";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Heart,
  Users,
  Globe,
  MessageCircle,
  Calendar,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Phechaan Headquarters",
      "123 Heritage Lane, Model Town",
      "Ludhiana - 141002, Punjab, India",
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 11 2345 6789", "Available 9 AM - 8 PM"],
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "hello@phechaan.com",
      "bookings@phechaan.com",
      "support@phechaan.com",
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 9:00 AM - 7:00 PM",
      "Saturday: 10:00 AM - 6:00 PM",
      "Sunday: 11:00 AM - 5:00 PM",
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

const faqs = [
  {
    question: "How do I book a trip with Phechaan?",
    answer:
      "You can book directly through our website, call us, or visit our office. We offer flexible payment options and personalized consultation.",
  },
  {
    question: "Are your trips suitable for families?",
    answer:
      "Absolutely! We have family-friendly packages and can customize trips for all age groups with appropriate activities and accommodations.",
  },
  {
    question: "What's included in your packages?",
    answer:
      "Our packages typically include accommodation, meals, local transportation, experienced guides, and all mentioned activities. Specific inclusions vary by package.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer attractive discounts for groups of 8 or more people. Contact us for custom group pricing and special arrangements.",
  },
];

const offices = [
  {
    city: "Ludhiana",
    address: "Model Town, Ludhiana, Punjab",
    phone: "+91 161 2345 6789",
    email: "ludhiana@phechaan.com",
    manager: "Anuradha Arora",
  },
  {
    city: "Mumbai",
    address: "Bandra Kurla Complex, Mumbai",
    phone: "+91 22 1234 5678",
    email: "mumbai@phechaan.com",
    manager: "Priya Nair",
  },
  {
    city: "Bangalore",
    address: "Koramangala, Bangalore",
    phone: "+91 80 9876 5432",
    email: "bangalore@phechaan.com",
    manager: "Rajesh Kumar",
  },
];

export default function Contact() {
  useSmoothScrollToTop();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
    travelDate: "",
    groupSize: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation with floating effect
    gsap.fromTo(
      heroRef.current,
      { y: 50, opacity: 0, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      },
    );

    // Contact cards with staggered scale animation
    gsap.fromTo(
      contactCardsRef.current?.children || [],
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: contactCardsRef.current,
          start: "top 80%",
        },
      },
    );

    // Form animation with slide in
    gsap.fromTo(
      formRef.current,
      { x: -100, opacity: 0, skewX: 5 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      },
    );

    // Map animation with 3D effect
    gsap.fromTo(
      mapRef.current,
      { x: 100, opacity: 0, rotationY: 45 },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
        },
      },
    );

    // FAQ animation with bouncy effect
    gsap.fromTo(
      faqRef.current?.children || [],
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        },
      },
    );

    // Offices animation with wave effect
    gsap.fromTo(
      officesRef.current?.children || [],
      { y: 60, opacity: 0, rotationZ: 5 },
      {
        y: 0,
        opacity: 1,
        rotationZ: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: officesRef.current,
          start: "top 80%",
        },
      },
    );

    // Continuous floating animation for hero elements
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
        travelDate: "",
        groupSize: "",
      });
    }, 3000);
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
              Join Our Journey
            </h1>
            <p className="text-xl md:text-2xl text-phechaan-cream/90 mb-8 max-w-3xl mx-auto">
              Ready to explore the unexplored? Let's craft your perfect
              adventure together. Connect with us to begin your authentic Indian
              experience.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Badge className="bg-phechaan-gold/20 text-phechaan-gold border-phechaan-gold/30 text-lg px-4 py-2">
                <MessageCircle className="mr-2" size={20} />
                24/7 Support
              </Badge>
              <Badge className="bg-phechaan-gold/20 text-phechaan-gold border-phechaan-gold/30 text-lg px-4 py-2">
                <Award className="mr-2" size={20} />
                Expert Guidance
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-gold mb-16 text-center">
            Get in Touch
          </h2>
          <div
            ref={contactCardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-phechaan-gold/30 text-center hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={info.color} size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-sm text-muted-foreground"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <Card className="border-border/50 hover:border-phechaan-gold/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl text-phechaan-gold">
                    Plan Your Adventure
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Share your travel dreams with us and we'll make them a
                    reality.
                  </p>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Preferred Destination
                          </label>
                          <Input
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            placeholder="e.g., Spiti Valley"
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Travel Date
                          </label>
                          <Input
                            name="travelDate"
                            type="date"
                            value={formData.travelDate}
                            onChange={handleInputChange}
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Group Size
                          </label>
                          <Input
                            name="groupSize"
                            value={formData.groupSize}
                            onChange={handleInputChange}
                            placeholder="2-4 people"
                            className="border-border focus:border-phechaan-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your travel preferences, interests, or any special requirements..."
                          rows={4}
                          className="border-border focus:border-phechaan-gold"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg py-3"
                      >
                        <Send className="mr-2" size={20} />
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle
                        className="text-green-500 mx-auto mb-4"
                        size={64}
                      />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you within
                        24 hours with personalized recommendations.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Map & Quick Info */}
            <div ref={mapRef} className="space-y-8">
              <Card className="border-border/50 hover:border-phechaan-gold/30 transition-colors">
                <CardContent className="p-0">
                  <div
                    className="w-full h-64 bg-gradient-to-br from-phechaan-earth to-phechaan-bronze rounded-t-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="bg-phechaan-deep-earth/80 backdrop-blur-sm rounded-lg p-6 text-center">
                      <MapPin
                        className="text-phechaan-gold mx-auto mb-2"
                        size={32}
                      />
                      <h3 className="text-phechaan-cream font-semibold">
                        Find Us in Ludhiana
                      </h3>
                      <p className="text-phechaan-cream/80 text-sm">
                        Heart of Punjab
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Visit Our Office
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-phechaan-gold mt-1" size={16} />
                        <div>
                          <p className="text-foreground font-medium">
                            123 Heritage Lane
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Model Town, Ludhiana - 141002, Punjab
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-phechaan-gold" size={16} />
                        <p className="text-muted-foreground text-sm">
                          Mon-Fri: 9 AM - 7 PM | Sat-Sun: 10 AM - 6 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border/50 hover:border-phechaan-gold/30 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Why Choose Us?
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Users, label: "1000+ Travelers", value: "Happy" },
                      {
                        icon: MapPin,
                        label: "50+ Destinations",
                        value: "Curated",
                      },
                      {
                        icon: Heart,
                        label: "25+ Communities",
                        value: "Supported",
                      },
                      {
                        icon: Award,
                        label: "95% Rating",
                        value: "Satisfaction",
                      },
                    ].map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <div key={index} className="text-center">
                          <IconComponent
                            className="text-phechaan-gold mx-auto mb-2"
                            size={24}
                          />
                          <div className="text-lg font-semibold text-foreground">
                            {stat.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-phechaan-gold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div ref={faqRef} className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-border/50 hover:border-phechaan-gold/30 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-phechaan-gold mb-12 text-center">
            Our Offices Across India
          </h2>
          <div
            ref={officesRef}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {offices.map((office, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-phechaan-gold/30 text-center hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-phechaan-gold">
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone size={16} />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail size={16} />
                      <span>{office.email}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground font-medium">
                      Office Manager
                    </p>
                    <p className="text-sm text-phechaan-gold">
                      {office.manager}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-phechaan-earth to-phechaan-bronze">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-phechaan-cream mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-phechaan-cream/90 mb-8">
            Don't just dream about exploring India's hidden gems. Take the first
            step towards an unforgettable journey that will transform how you
            see the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth text-lg px-8"
            >
              <Calendar className="mr-2" size={20} />
              Book Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-phechaan-cream text-phechaan-cream hover:bg-phechaan-cream hover:text-phechaan-deep-earth text-lg px-8"
            >
              <MessageCircle className="mr-2" size={20} />
              Live Chat
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
