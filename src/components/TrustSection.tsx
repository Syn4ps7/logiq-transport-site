import { motion } from "framer-motion";
import { Shield, Clock, Lock, Award } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: Award,
      title: "Véhicules 2025",
      description: "Flotte neuve, entretenue selon les standards constructeur.",
    },
    {
      icon: Clock,
      title: "Assistance 24/7",
      description: "Support disponible à toute heure, 7 jours sur 7.",
    },
    {
      icon: Lock,
      title: "Réservation sécurisée",
      description: "Paiement crypté via Fleetee, plateforme certifiée.",
    },
    {
      icon: Shield,
      title: "Standard Suisse",
      description: "Qualité et fiabilité garanties, conformité totale.",
    },
  ];

  return (
    <section id="trust" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Swiss Badge */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border">
              <div className="w-8 h-8 rounded bg-destructive flex items-center justify-center">
                <span className="text-destructive-foreground font-bold text-xs">+</span>
              </div>
              <span className="text-foreground font-semibold">LogIQ Transport</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">Swiss Standards</span>
            </div>
          </div>

          {/* Trust Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;