import { Navbar } from "@/components/navbar";
import { HeroScene } from "@/components/hero-scene";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { PartsSection } from "@/components/parts-section";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <Navbar />
      <CartDrawer />
      <HeroScene />
      <ProductsSection />
      <ServicesSection />
      <PartsSection />
      <Footer />
    </div>
  );
}
