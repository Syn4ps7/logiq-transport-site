import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    label: "Véhicules",
    href: "/#vehicules"
  }, {
    label: "Options",
    href: "/#options"
  }, {
    label: "FAQ",
    href: "/faq"
  }, {
    label: "À propos",
    href: "/a-propos"
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
            </span>
            </div>
            <span className="text-foreground font-semibold text-lg tracking-tight">
              LogIQ <span className="text-muted-foreground font-normal">Transport</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                {link.label}
              </a>)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="/reservation">
              <Button variant="cta" size="sm">
                Réserver
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>)}
              <a href="/reservation">
                <Button variant="cta" size="sm" className="w-full mt-2">
                  Réserver
                </Button>
              </a>
            </div>
          </motion.div>}
      </div>
    </motion.nav>;
};
export default Navbar;