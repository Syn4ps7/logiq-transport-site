import { useState, useMemo } from "react";
import { format, differenceInDays, isWeekend } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeft, Truck, Loader2, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PRICES = {
  weekday: 140, // CHF/jour
  weekend: 180, // CHF/jour
  diable: 15,
  sangles: 15,
  serenite: 49,
};

// EmailJS configuration - À configurer sur https://www.emailjs.com/
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Remplacer par votre Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Remplacer par votre Template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Remplacer par votre Public Key

const Reservation = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [vehicle, setVehicle] = useState<string>("");
  const [options, setOptions] = useState({
    diable: false,
    sangles: false,
    serenite: false,
  });

  // Contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ];

  const vehicles = [
    { id: "sprinter", name: "Mercedes Sprinter", description: "12m³ - Idéal déménagement" },
    { id: "crafter", name: "VW Crafter", description: "14m³ - Grande capacité" },
    { id: "transit", name: "Ford Transit", description: "10m³ - Compact et maniable" },
  ];

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const priceDetails = useMemo(() => {
    if (!startDate || !endDate) return null;

    const days = Math.max(1, differenceInDays(endDate, startDate) + 1);
    
    // Calculate daily rates based on each day
    let vehicleTotal = 0;
    let weekdayCount = 0;
    let weekendCount = 0;
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      if (isWeekend(currentDate)) {
        vehicleTotal += PRICES.weekend;
        weekendCount++;
      } else {
        vehicleTotal += PRICES.weekday;
        weekdayCount++;
      }
    }

    const optionsTotal = 
      (options.diable ? PRICES.diable : 0) +
      (options.sangles ? PRICES.sangles : 0) +
      (options.serenite ? PRICES.serenite : 0);

    const total = vehicleTotal + optionsTotal;

    return {
      days,
      weekdayCount,
      weekendCount,
      vehicleTotal,
      optionsTotal,
      total,
    };
  }, [startDate, endDate, options]);

  const isFormValid = 
    startDate && endDate && startTime && endTime && vehicle && 
    name.trim() && email.trim() && phone.trim();

  const handleSubmit = async () => {
    if (!isFormValid || !priceDetails) return;

    setIsSubmitting(true);

    const selectedVehicle = vehicles.find(v => v.id === vehicle);
    const optionsList = [
      options.diable && "Diable (15 CHF)",
      options.sangles && "Sangles & couvertures (15 CHF)",
      options.serenite && "Option Sérénité+ (49 CHF)",
    ].filter(Boolean).join(", ") || "Aucune";

    const templateParams = {
      // Client info
      client_name: name,
      client_email: email,
      client_phone: phone,
      // Reservation details
      start_date: format(startDate!, "PPP", { locale: fr }),
      start_time: startTime,
      end_date: format(endDate!, "PPP", { locale: fr }),
      end_time: endTime,
      vehicle_name: selectedVehicle?.name || "",
      vehicle_description: selectedVehicle?.description || "",
      duration: `${priceDetails.days} jour${priceDetails.days > 1 ? "s" : ""}`,
      options: optionsList,
      total_price: `${priceDetails.total} CHF`,
      // Price breakdown
      weekday_count: priceDetails.weekdayCount,
      weekend_count: priceDetails.weekendCount,
      vehicle_total: `${priceDetails.vehicleTotal} CHF`,
      options_total: `${priceDetails.optionsTotal} CHF`,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      toast({
        title: "Réservation envoyée !",
        description: "Nous vous contacterons rapidement pour confirmer votre réservation.",
      });
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      toast({
        title: "Erreur d'envoi",
        description: "Un problème est survenu. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Demande envoyée !
          </h1>
          <p className="text-muted-foreground mb-6">
            Merci pour votre demande de réservation. Nous vous contacterons dans les plus brefs délais pour confirmer la disponibilité et finaliser votre réservation.
          </p>
          <Button variant="cta" asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Réservation
            </h1>
            <p className="text-muted-foreground">
              Sélectionnez vos dates, votre véhicule et vos options.
            </p>
          </div>

          <div className="space-y-8">
            {/* Date & Time Selection */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Dates et horaires
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <Label>Heure de début</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label>Heure de fin</Label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Sélection du véhicule
              </h2>
              
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVehicle(v.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                      vehicle === v.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{v.name}</p>
                      <p className="text-sm text-muted-foreground">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Options complémentaires
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="diable"
                    checked={options.diable}
                    onCheckedChange={() => handleOptionChange("diable")}
                  />
                  <Label htmlFor="diable" className="cursor-pointer">
                    <span className="text-foreground">Diable</span>
                    <span className="text-muted-foreground ml-2">— 15 CHF</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="sangles"
                    checked={options.sangles}
                    onCheckedChange={() => handleOptionChange("sangles")}
                  />
                  <Label htmlFor="sangles" className="cursor-pointer">
                    <span className="text-foreground">Sangles & couvertures</span>
                    <span className="text-muted-foreground ml-2">— 15 CHF</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="serenite"
                    checked={options.serenite}
                    onCheckedChange={() => handleOptionChange("serenite")}
                  />
                  <Label htmlFor="serenite" className="cursor-pointer">
                    <span className="text-foreground">Option Sérénité+</span>
                    <span className="text-muted-foreground ml-2">— 49 CHF (franchise réduite à 500 CHF)</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Vos coordonnées
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+41 79 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Price Summary */}
            {priceDetails && vehicle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-card border-2 border-primary/40"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Récapitulatif
                </h2>
                
                <div className="space-y-3 text-sm">
                  {/* Duration */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durée</span>
                    <span className="text-foreground font-medium">
                      {priceDetails.days} jour{priceDetails.days > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Vehicle */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Véhicule</span>
                    <span className="text-foreground font-medium">
                      {vehicles.find(v => v.id === vehicle)?.name}
                    </span>
                  </div>

                  <div className="border-t border-border my-3" />

                  {/* Vehicle pricing breakdown */}
                  {priceDetails.weekdayCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {priceDetails.weekdayCount} jour{priceDetails.weekdayCount > 1 ? "s" : ""} semaine × {PRICES.weekday} CHF
                      </span>
                      <span className="text-foreground">
                        {priceDetails.weekdayCount * PRICES.weekday} CHF
                      </span>
                    </div>
                  )}
                  
                  {priceDetails.weekendCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {priceDetails.weekendCount} jour{priceDetails.weekendCount > 1 ? "s" : ""} week-end × {PRICES.weekend} CHF
                      </span>
                      <span className="text-foreground">
                        {priceDetails.weekendCount * PRICES.weekend} CHF
                      </span>
                    </div>
                  )}

                  {/* Options */}
                  {options.diable && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diable</span>
                      <span className="text-foreground">{PRICES.diable} CHF</span>
                    </div>
                  )}
                  
                  {options.sangles && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sangles & couvertures</span>
                      <span className="text-foreground">{PRICES.sangles} CHF</span>
                    </div>
                  )}
                  
                  {options.serenite && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Option Sérénité+</span>
                      <span className="text-foreground">{PRICES.serenite} CHF</span>
                    </div>
                  )}

                  <div className="border-t border-border my-3" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-semibold text-base">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {priceDetails.total} CHF
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    100 km inclus par jour. Km supplémentaire : 0.70 CHF
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button 
              variant="cta" 
              size="lg" 
              className="w-full"
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer la demande de réservation"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              En cliquant sur ce bouton, vous acceptez d'être contacté pour finaliser votre réservation.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reservation;
