import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeft, Truck } from "lucide-react";
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

const Reservation = () => {
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
                    <span className="text-muted-foreground ml-2">— 25 CHF/jour (franchise réduite à 500 CHF)</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button variant="cta" size="lg" className="w-full">
              Continuer la réservation
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reservation;
