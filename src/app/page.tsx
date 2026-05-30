import Hero from "@/components/Hero";
import CurrentlyCooking from "@/components/CurrentlyCooking";
import RecentlyMade from "@/components/RecentlyMade";
import OtherWork from "@/components/OtherWork";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#fffaf5]">
      <Hero />
      <CurrentlyCooking />
      <RecentlyMade />
      <OtherWork />
      <About />
      <div className="h-16" />
    </main>
  );
}
