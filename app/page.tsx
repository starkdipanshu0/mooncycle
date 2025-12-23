import { UnboxingSection } from "@/components/landing/UnboxingSection";
import { PurchaseGateway } from "@/components/landing/PurchaseGateway";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F2EB]">
      {/* 
        UnboxingSection handles the first 4 "phases":
        1. Arrival
        2. Box Opening
        3. Product Explanation
        4. Clearing
      */}
      <UnboxingSection />
    </main>
  );
}
