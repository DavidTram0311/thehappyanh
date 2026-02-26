import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      <HeroSection />
      <SocialIcons />
    </main>
  );
}
