import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Réservation & Disponibilité",
      items: [
        {
          question: "Comment réserver un véhicule ?",
          answer: "La réservation se fait 100 % en ligne via notre site web. Sélectionnez votre véhicule, vos dates et options, puis remplissez le formulaire de demande. Vous recevrez une confirmation par e-mail après validation de la disponibilité."
        },
        {
          question: "Puis-je réserver un véhicule à la dernière minute ?",
          answer: "Oui, sous réserve de disponibilité. Nous recommandons toutefois de réserver au moins 24 à 48 heures à l'avance pour garantir la disponibilité du véhicule souhaité."
        },
        {
          question: "Comment savoir si un véhicule est disponible ?",
          answer: "Après votre demande de réservation, nous vous confirmons la disponibilité par e-mail dans les plus brefs délais. Le calendrier de disponibilité est mis à jour régulièrement."
        },
        {
          question: "Puis-je modifier ou annuler ma réservation ?",
          answer: "Oui, vous pouvez modifier ou annuler votre réservation en nous contactant par e-mail. Les conditions d'annulation sont détaillées dans nos Conditions Générales de Location (CGL)."
        },
      ]
    },
    {
      title: "Tarifs & Paiement",
      items: [
        {
          question: "Comment sont calculés les tarifs ?",
          answer: "Les tarifs sont affichés clairement sur notre site. Le prix dépend du véhicule choisi, de la durée de location et des options sélectionnées. Tous les prix sont indiqués TTC."
        },
        {
          question: "Que comprend le prix de la location ?",
          answer: "Le tarif de base inclut la location du véhicule, l'assurance de base, 100 km par jour et la TVA. Les kilomètres supplémentaires sont facturés à 0.50 CHF/km."
        },
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Le paiement s'effectue avant la prise en charge du véhicule. Nous acceptons les principaux moyens de paiement électroniques. Les détails vous seront communiqués lors de la confirmation."
        },
        {
          question: "Y a-t-il une caution à verser ?",
          answer: "Oui, une caution est demandée au moment de la prise en charge du véhicule. Le montant dépend du véhicule loué et est restitué après retour du véhicule en bon état."
        },
        {
          question: "Qu'est-ce que l'Option Sérénité+ ?",
          answer: "L'Option Sérénité+ est un forfait à 49 CHF par location (non par jour) qui réduit significativement votre franchise en cas de dommage. Elle offre une tranquillité d'esprit maximale pendant votre location."
        },
      ]
    },
    {
      title: "Véhicules & Équipements",
      items: [
        {
          question: "Quels types de véhicules proposez-vous ?",
          answer: "Nous proposons une gamme d'utilitaires adaptés à différents besoins : du petit utilitaire pour les déménagements légers au grand fourgon pour les volumes importants. Tous nos véhicules sont récents et bien entretenus."
        },
        {
          question: "Les véhicules sont-ils équipés ?",
          answer: "Tous nos véhicules disposent d'équipements de base. Des options supplémentaires (diable, sangles, couvertures de protection) sont disponibles à la réservation."
        },
        {
          question: "Les véhicules sont-ils propres ?",
          answer: "Oui, chaque véhicule est nettoyé et vérifié entre chaque location. Nous vous demandons de le restituer dans un état de propreté similaire."
        },
        {
          question: "Puis-je transporter des animaux ?",
          answer: "Le transport d'animaux est possible sous certaines conditions. Veuillez nous contacter pour en discuter avant votre réservation."
        },
      ]
    },
    {
      title: "Prise en charge & Retour",
      items: [
        {
          question: "Où puis-je récupérer le véhicule ?",
          answer: "Nos véhicules sont basés sur la Riviera vaudoise. L'adresse exacte de prise en charge vous sera communiquée lors de la confirmation de votre réservation."
        },
        {
          question: "La prise en charge est-elle possible 24h/24 ?",
          answer: "Oui, grâce à notre système de véhicules connectés, vous pouvez accéder à votre véhicule de manière autonome, 24h/24 et 7j/7, selon les modalités convenues."
        },
        {
          question: "Comment fonctionne le retour du véhicule ?",
          answer: "Le retour s'effectue au même endroit que la prise en charge. Vous devez restituer le véhicule à l'heure convenue, propre et avec le même niveau de carburant qu'au départ."
        },
        {
          question: "Que se passe-t-il en cas de retard au retour ?",
          answer: "En cas de retard, veuillez nous prévenir dès que possible. Des frais supplémentaires peuvent s'appliquer selon la durée du dépassement et les conditions prévues dans les CGL."
        },
      ]
    },
    {
      title: "Conditions & Assurance",
      items: [
        {
          question: "Quelles sont les conditions pour louer ?",
          answer: "Vous devez être âgé d'au moins 21 ans, posséder un permis de conduire valide (catégorie B) depuis au moins 2 ans, et présenter une pièce d'identité en cours de validité."
        },
        {
          question: "L'assurance est-elle incluse ?",
          answer: "Oui, une assurance responsabilité civile et une couverture de base sont incluses. L'Option Sérénité+ permet de réduire davantage la franchise."
        },
        {
          question: "Que faire en cas d'accident ou de panne ?",
          answer: "En cas d'accident, sécurisez les lieux et contactez-nous immédiatement. Remplissez le constat amiable présent dans le véhicule. En cas de panne, appelez le numéro d'assistance indiqué dans vos documents de location."
        },
        {
          question: "Puis-je conduire à l'étranger ?",
          answer: "La location est prévue pour une utilisation en Suisse. Pour tout déplacement à l'étranger, veuillez nous consulter au préalable afin de vérifier les conditions d'assurance applicables."
        },
      ]
    },
    {
      title: "Contact & Assistance",
      items: [
        {
          question: "Comment vous contacter ?",
          answer: "Vous pouvez nous joindre par e-mail à contact@logiq-transport.ch. Nous répondons généralement dans les 24 heures ouvrées."
        },
        {
          question: "Proposez-vous une assistance en cas de problème ?",
          answer: "Oui, une assistance est disponible pendant toute la durée de votre location. Les coordonnées vous sont communiquées avec votre confirmation de réservation."
        },
        {
          question: "Où puis-je consulter les Conditions Générales de Location ?",
          answer: "Les Conditions Générales de Location (CGL) sont disponibles sur notre site web dans la section dédiée. Nous vous invitons à les lire attentivement avant toute réservation."
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Foire aux Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus fréquentes sur nos services de location.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="surface-card rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    {categoryIndex + 1}
                  </span>
                  {category.title}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem 
                      key={itemIndex} 
                      value={`${categoryIndex}-${itemIndex}`}
                      className="border-border/50 px-4 rounded-md bg-background/50"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas trouvé la réponse à votre question ?
            </p>
            <a 
              href="mailto:contact@logiq-transport.ch" 
              className="text-primary hover:underline font-medium"
            >
              Contactez-nous par e-mail →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
