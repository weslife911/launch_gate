"use client";

import { Link2, GitBranch, Globe } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const features = [
  {
    title: "Unique Referral Links",
    description: "Each Ambassador receives a personalized link to track recruitment numbers automatically.",
    icon: Link2,
  },
  {
    title: "Automated Hub Routing",
    description: "Structure member data and route them to sector-specific WhatsApp hubs instantly.",
    icon: GitBranch,
  },
  {
    title: "Global Opportunity Scraper",
    description: "Automated backend script pulling opportunities from official global websites.",
    icon: Globe,
  },
];



export default function Features() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
        >
          <h2 className="text-sm font-black text-[#0052ff] uppercase tracking-[0.4em] mb-4">Core Infrastructure</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 italic">BUILT FOR POWER.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <TiltCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}