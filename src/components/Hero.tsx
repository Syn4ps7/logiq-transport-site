import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVan from "@/assets/hero-van.jpg";
const Hero = () => {
  const features = [{
    icon: Zap,
    text: "Réservation 60 sec"
  }, {
    icon: Clock,
    text: "Flotte 2025"
  }, {
    icon: Shield,
    text: "Standard Suisse"
  }];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-glow-pulse" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Location utilitaires premium</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            La mobilité pro,
            <br />
            <span className="text-gradient-accent">version haute précision.</span>
          </motion.h1>

          {/* H2 */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">Louez votre utilitaire LogIQ en 60 secondes. Flotte neuve, gestion 100% digitale, standard suisse.</motion.p>

          {/* CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="/reservation">
              <Button variant="cta" size="lg" className="group">
                Réserver mon véhicule
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#tarifs">
              <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
                Voir les tarifs
              </Button>
            </a>
          </motion.div>

          {/* Feature Pills */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{feature.text}</span>
              </div>)}
          </motion.div>
        </div>

        {/* Vehicle Visual */}
        <motion.div initial={{
        opacity: 0,
        y: 60
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="mt-20 relative">
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden relative">
            {/* Glow under vehicle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 bg-primary/10 blur-3xl" />
            
            <img src={heroVan} alt="Utilitaire LogIQ Transport - Flotte premium 2025" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;