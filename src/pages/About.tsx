import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              À propos
            </h1>
            <p className="text-primary font-medium">
              LogIQ Transport
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="surface-card rounded-lg p-8 md:p-12 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                LogIQ Transport est un service indépendant de location d'utilitaires nouvelle génération, basé sur la Riviera vaudoise.
              </p>

              <p>
                Notre mission est simple : rendre la location d'un utilitaire aussi fluide, rapide et accessible que possible, sans passage en agence, sans attente et sans contraintes inutiles.
              </p>

              <p>
                Face à un marché traditionnel souvent rigide, LogIQ Transport propose une alternative moderne fondée sur trois piliers : la disponibilité 24h/24, la réservation 100 % en ligne et une tarification claire.
              </p>

              <p>
                Grâce à une gestion digitalisée de la flotte et à des véhicules connectés, nos clients peuvent réserver en quelques clics, accéder à leur véhicule de manière autonome et bénéficier d'un service fiable, transparent et premium.
              </p>

              <p>
                LogIQ Transport s'adresse aussi bien aux particuliers qu'aux professionnels ayant besoin d'un utilitaire ponctuellement : déménagement, transport de matériel, événements ou besoins professionnels temporaires.
              </p>

              <p>
                Notre modèle "asset light" permet de concentrer les investissements là où ils apportent le plus de valeur : qualité des véhicules, sécurité, disponibilité et expérience client.
              </p>

              <p>
                Entreprise à taille humaine, LogIQ Transport place la confiance, la responsabilité et la simplicité au cœur de sa relation client.
              </p>
            </div>

            {/* Values Section */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="surface-card rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl">🚀</span>
                </div>
                <h3 className="text-foreground font-semibold mb-2">Disponibilité 24h/24</h3>
                <p className="text-muted-foreground text-sm">
                  Accédez à votre véhicule à toute heure, en toute autonomie.
                </p>
              </div>

              <div className="surface-card rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl">💻</span>
                </div>
                <h3 className="text-foreground font-semibold mb-2">100% Digital</h3>
                <p className="text-muted-foreground text-sm">
                  Réservation en ligne, sans passage en agence.
                </p>
              </div>

              <div className="surface-card rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl">✨</span>
                </div>
                <h3 className="text-foreground font-semibold mb-2">Tarification Claire</h3>
                <p className="text-muted-foreground text-sm">
                  Prix transparents, sans frais cachés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
