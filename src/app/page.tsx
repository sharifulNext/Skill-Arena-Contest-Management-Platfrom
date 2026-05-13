import Hero from "@/components/hero/Hero";
import AISection from "@/components/home/Ai-Section";
import Categories from "@/components/home/category/Categories";
import FAQSection from "@/components/home/FAQ";
import FeaturesSection from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import MiniLeaderboard from "@/components/home/Leaderboard";
import OrganizerSection from "@/components/home/Organizer";
import Stats from "@/components/home/stats/Stats";
import TestimonialsSection from "@/components/home/Testimonials";

export default function Home() {
  return (
        <div className="flex flex-col min-h-screen">
             <section >
                <Hero/>
             </section>
             <Stats/>
             <Categories/>
             <FeaturesSection/>
             <AISection/>
             <MiniLeaderboard/>
             <HowItWorks/>
             <OrganizerSection/>
             <TestimonialsSection/>
             <FAQSection/>
        </div>
  );
}