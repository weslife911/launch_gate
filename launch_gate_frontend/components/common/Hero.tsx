"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 82, 255, 0.1)"; 
      
      const spacing = 40;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const dist = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
          const size = dist < 150 ? 3 : 1.5;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
    return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white light-grid">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#0052ff]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#0052ff]">Launchpad Infrastructure</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.85] italic"
        >
          SCALE YOUR <br />
          <span className="text-[#0052ff] glitch-text">ORGANIZATION</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          From manual member tracking to automated global recruitment
          infrastructure. Empowering ambassadors with strategic insight and
          real-time data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="h-16 px-10 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
            Start Scaling Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 border-slate-200 text-slate-600 font-bold rounded-2xl bg-white/50 hover:bg-white backdrop-blur-sm"
          >
            <Play className="mr-2 w-4 h-4 fill-slate-600" />
            Watch System Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;