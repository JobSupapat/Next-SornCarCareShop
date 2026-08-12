// src/app/page.tsx
import PromoBar from "@/components/common/PromoBar";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import BundleSection from "@/components/home/BundleSection";
import CarCareCenter from "@/components/home/CarCareCenter";
import FaqSection from "@/components/home/FaqSection";
import FaqSchema from "@/components/seo/FaqSchema";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-brand-gray-bg)]">
      {/* 1. FAQ Schema Injection (AEO Engine) */}
      <FaqSchema />

      {/* 2. Top Announcement Bar */}
      <PromoBar />

      {/* 3. Main Navigation Header */}
      <Navbar />

      {/* 4. Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <HeroSection />

        {/* Products Section */}
        <ProductGrid />

        {/* Bundles & Savers Section */}
        <BundleSection />

        {/* Car Care Center (Video Hub & Proof) */}
        <CarCareCenter />

        {/* AEO FAQ Section */}
        <FaqSection />
      </main>

      {/* 5. Footer Component */}
      <Footer />
    </div>
  );
}