import { CTASection } from "@/components/moduels/Public/Home/CTASection";
import { FeaturesSection } from "@/components/moduels/Public/Home/FeaturesSection";
import { HeroSection } from "@/components/moduels/Public/Home/HeroSection";
import { HowItWorks } from "@/components/moduels/Public/Home/HowItWorks";
import PricingSection from "@/components/moduels/Public/Home/PricingSection";
import { StatsBar } from "@/components/moduels/Public/Home/StatsBar";


const HomePage = () => {

    return (
        <>            
            <div>

                <HeroSection />
                <StatsBar />
                <FeaturesSection />
                <HowItWorks />
                <PricingSection />
                <CTASection />

            </div>
        </>
    );
};

export default HomePage;