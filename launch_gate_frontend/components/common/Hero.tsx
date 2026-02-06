import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <span className="w-2 h-2 bg-[#0052ff] rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-[#0052ff] uppercase tracking-wider">Live System Beta</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
          Scaling Launchpad with <span className="text-[#0052ff]">Intelligent Automation</span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          From manual member tracking to automated global recruitment infrastructure. 
          Empowering ambassadors with strategic insight and real-time data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-[#0052ff] hover:bg-[#0042cc] px-8 text-lg">
            Start Scaling Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-slate-200 text-slate-600 px-8 text-lg">
            <Play className="mr-2 w-4 h-4 fill-current" />
            Watch System Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;