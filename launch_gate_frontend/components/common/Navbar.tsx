"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Rocket, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  MessageSquare,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  // Replace this with your actual auth state from a hook like useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "How it Works", href: "/#how-it-works", guestOnly: true },
    { name: "Contact", href: "/contact", guestOnly: false },
    { name: "Dashboard", href: "/dashboard", authOnly: true },
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.authOnly && !isLoggedIn) return false;
    if (link.guestOnly && isLoggedIn) return false;
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#0052ff] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">LaunchGate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {filteredLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                pathname === link.href 
                  ? "text-[#0052ff]" 
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="font-bold text-slate-600">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-[#0052ff] hover:bg-[#0042cc] font-bold px-6 shadow-lg shadow-blue-100">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 rounded-full pl-2 pr-4">
                  <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#0052ff]" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Account</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 mt-2">
                <DropdownMenuLabel className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                  Workspace
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard" className="flex items-center gap-2 py-2">
                    <LayoutDashboard className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold">My Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/contact" className="flex items-center gap-2 py-2">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold">Support Hub</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 cursor-pointer py-2"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="font-bold">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
          {filteredLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-bold text-slate-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full h-12">Login</Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button className="w-full h-12 bg-[#0052ff]">Get Started</Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="destructive" 
                className="w-full h-12"
                onClick={() => setIsLoggedIn(false)}
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}