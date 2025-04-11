import Header from "@/components/shared/Header/Header"
import Hero from "@/components/shared/Hero/Hero"
import FeaturesSection from "@/components/shared/FeaturesSection/FeaturesSection"
import HowItWorksSection from "@/components/shared/HowItWorksSection/HowItWorksSection"
import StatsSection from "@/components/shared/StatsSection/StatsSection"
import UseCasesSection from "@/components/shared/UseCasesSection/UseCasesSection"
import PricingSection from "@/components/shared/PricingSection/PricingSection"
import CTASection from "@/components/shared/CTASection/CTASection"
import Footer from "@/components/shared/Footer/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <UseCasesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}
