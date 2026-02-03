import { motion } from "framer-motion";
import { Package, Shield, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
const FeaturedPack = () => {
  const packFeatures = [{
    icon: Shield,
    text: "Assurance Sérénité+ (franchise 500 CHF)"
  }, {
    icon: Truck,
    text: "Diable Pro inclus"
  }, {
    icon: Package,
    text: "Kit de protection (sangles & couvertures)"
  }];
  return <section id="pack-serenite" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto">
          {/* Featured Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              <Package className="w-4 h-4" />
              Best-Seller
            </span>
          </div>

          {/* Main Card */}
          <div className="rounded-xl bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/40 p-8 md:p-12 glow-accent">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Pack "Sérénité"</h2>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-primary">49</span>
                  <span className="text-muted-foreground">CHF / location</span>
                </div>

                <p className="text-muted-foreground mb-6">
                  Tout ce dont vous avez besoin pour un déménagement sans stress. La tranquillité totale en un seul pack.
                </p>

                <ul className="space-y-4 mb-8">
                  {packFeatures.map((feature, index) => <motion.li key={index} initial={{
                  opacity: 0,
                  x: -20
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </motion.li>)}
                </ul>

                <a href="/reservation">
                  <Button variant="cta" size="lg" className="w-full md:w-auto">
                    Ajouter à ma réservation
                  </Button>
                </a>
              </div>

              {/* Right: Social Proof */}
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-secondary/50 border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">70%</p>
                <p className="text-muted-foreground text-sm">
                  Choisi par 70% de nos clients pour une tranquillité totale.
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 text-primary fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default FeaturedPack;