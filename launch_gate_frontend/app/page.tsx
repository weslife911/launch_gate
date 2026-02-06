import Features from "@/components/common/Features";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}