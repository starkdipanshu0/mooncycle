import { AboutSection } from "@/components/landing/AboutSection";
import { IngredientsSection } from "@/components/landing/IngredientsSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactStrip } from "@/components/landing/ContactStrip";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F2EB]">

      <HeroSection />
      <ProductShowcase />
      <IngredientsSection />
      <AboutSection />
      <ContactStrip />
      <FAQSection />
    </main>
  );
}
