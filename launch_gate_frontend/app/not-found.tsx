"use client";

import Link from "next/link";
import { 
  Rocket, 
  Home, 
  ArrowLeft, 
  Search, 
  FileQuestion,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function NotFound() {

  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Brand Header */}
      <div className="mb-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#0052ff] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">LaunchGate</span>
        </Link>
      </div>

      <div className="text-center max-w-lg">
        {/* Large Decorative Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
            <Search className="w-16 h-16 text-[#0052ff] opacity-20" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FileQuestion className="w-16 h-16 text-[#0052ff]" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          The automated routing system couldn't find the resource you requested. 
          It may have been moved, deleted, or never existed in the LaunchGate hub.
        </p>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild
            className="w-full sm:w-auto h-12 px-8 bg-[#0052ff] hover:bg-[#0042cc] text-white font-bold shadow-lg shadow-blue-200"
          >
            {isAuthenticated ? <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link> : <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Home Page
            </Link>}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto h-12 px-8 border-slate-200 text-slate-600 font-semibold hover:bg-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Page
          </Button>
        </div>
      </div>

      {/* Footer Trust Indicator */}
      <div className="mt-20 flex items-center gap-2 text-slate-400">
        <ShieldAlert className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">
          System Guard Active
        </span>
      </div>
    </div>
  );
}