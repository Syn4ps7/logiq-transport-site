import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingGrid from "@/components/PricingGrid";
import FeaturedPack from "@/components/FeaturedPack";
import Options from "@/components/Options";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PricingGrid />
      <FeaturedPack />
      <Options />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
