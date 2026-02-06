import Link from "next/link";
import { Rocket, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Rocket className="w-6 h-6 text-[#0052ff]" />
              <span className="text-2xl font-bold tracking-tight">LaunchGate</span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Automating Launchpad's global recruitment through intelligent infrastructure and strategic insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">System</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link href="#how-it-works" className="hover:text-[#0052ff] transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0052ff] transition-colors">Data Dashboard</Link></li>
              <li><Link href="/portal" className="hover:text-[#0052ff] transition-colors">Onboarding Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>© 2026 LaunchGate System. Professional Infrastructure for Launchpad.</p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-white cursor-pointer" />
            <Github className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;