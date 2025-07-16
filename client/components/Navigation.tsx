import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhechaanLogo from "@/components/PhechaanLogo";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/destinations", label: "Destinations" },
    { path: "/about", label: "About" },
    { path: "/packages", label: "Packages" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-3">
              <PhechaanLogo size={40} className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-2xl md:text-3xl font-bold text-phechaan-gold">
                Phechaan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-foreground hover:text-phechaan-gold transition-colors duration-200 ${
                    location.pathname === link.path ? "text-phechaan-gold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth">
                Start Journey
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block text-foreground hover:text-phechaan-gold transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-phechaan-gold"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full bg-phechaan-gold hover:bg-phechaan-dark-gold text-phechaan-deep-earth">
                  Start Journey
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <ScrollToTopButton />
    </>
  );
}
