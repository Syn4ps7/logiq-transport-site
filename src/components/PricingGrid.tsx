import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingGrid = () => {
  const plans = [
    {
      name: "Semaine",
      price: "140",
      unit: "CHF / jour",
      description: "Du lundi au jeudi",
      features: ["100 km inclus", "Assurance standard", "Assistance 24/7"],
      highlighted: false,
    },
    {
      name: "Week-End",
      price: "180",
      unit: "CHF / jour",
      description: "Vendredi au dimanche",
      features: ["100 km inclus", "Assurance standard", "Assistance 24/7"],
      highlighted: false,
    },
    {
      name: "Pack 48h",
      price: "390",
      unit: "CHF forfait",
      description: "Idéal pour les projets",
      features: ["200 km inclus", "Assurance standard", "Flexibilité maximale"],
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparence tarifaire
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des prix clairs, sans surprise. Choisissez la formule adaptée à vos besoins.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-lg p-6 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-primary/10 to-card border-2 border-primary glow-accent"
                  : "surface-card border border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Populaire
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "cta" : "outline"}
                className="w-full"
              >
                Réserver
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Km supplémentaire : 0.70 CHF. Correspond au coût réel d'usure et d'entretien du véhicule.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingGrid;