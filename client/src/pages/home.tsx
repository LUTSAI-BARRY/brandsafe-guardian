import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { RevenueBoosting } from "@/components/sections/revenue-boost";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { GooglePartnership } from "@/components/sections/google-partnership";
import { StatisticsSection } from "@/components/sections/statistics";
import { FAQSection } from "@/components/sections/faq";
import { AppScreenshots } from "@/components/sections/app-screenshots";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RevenueBoosting />
        <TestimonialsSection />
        <PricingSection />
        <GooglePartnership />
        <StatisticsSection />
        <FAQSection />
        <AppScreenshots />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
