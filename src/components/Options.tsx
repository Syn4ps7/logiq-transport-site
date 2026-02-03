import { motion } from "framer-motion";
import { Shield, Users, Wrench } from "lucide-react";

const Options = () => {
  const options = [
    {
      icon: Shield,
      name: "Option Sérénité+",
      price: "49 CHF/location",
      description: "La franchise passe de 2'000 à 500 CHF. Forfait unique par location, non par jour.",
    },
    {
      icon: Users,
      name: "Conducteur Supplémentaire",
      price: "10 CHF/jour",
      description: "Extension d'assurance officielle pour partager la conduite en toute légalité.",
    },
    {
      icon: Wrench,
      name: "Équipement Pro",
      price: "15 CHF/location",
      description: "Diable professionnel ou Kit protection (sangles & couvertures) à l'unité.",
    },
  ];

  return (
    <section id="options" className="py-24 bg-secondary/20">
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
            Options & Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Personnalisez votre location avec nos options premium.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <option.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{option.name}</h3>
                <span className="text-primary font-medium text-sm">{option.price}</span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {option.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Options;