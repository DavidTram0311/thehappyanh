import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/home/AboutSection";
import SocialIcons from "@/components/ui/SocialIcons";

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      <AboutSection />
      <SocialIcons />
    </main>
  );
}
