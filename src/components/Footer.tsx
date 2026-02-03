import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Footer = () => {
  return <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Réservez votre utilitaire en quelques clics et profitez du standard suisse.
          </p>
          <Button variant="cta" size="lg" className="group">
            Réserver maintenant
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
            </span>
            </div>
            <span className="text-foreground font-medium">
              LogIQ <span className="text-muted-foreground font-normal">Transport</span>
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="/a-propos" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              CGV
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2025 LogIQ Transport. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;