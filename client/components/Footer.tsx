import { MapPin } from "lucide-react";
import PhechaanLogo from "@/components/PhechaanLogo";

export default function Footer() {
  return (
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
                <span className="text-phechaan-cream/70">Adventure Travel</span>
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
                <span className="text-phechaan-cream/70">Custom Packages</span>
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
  );
}
