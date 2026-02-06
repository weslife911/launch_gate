"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Search, 
  Rocket 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Ambassadors", url: "/dashboard/ambassadors", icon: Users },
  { title: "Regional Hubs", url: "/dashboard/hubs", icon: MapPin },
  { title: "Scraper", url: "/dashboard/scraper", icon: Search },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  // Active state detection logic for Next.js App Router
  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#0052ff] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold text-slate-900 tracking-tight">
              LaunchGate
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-4 mb-2">
            System Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className={cn(
                      "transition-colors",
                      isActive(item.url) 
                        ? "bg-blue-50 text-[#0052ff] font-semibold" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={cn(
                        "h-4 w-4",
                        isActive(item.url) ? "text-[#0052ff]" : "text-slate-400"
                      )} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        {!collapsed && (
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-medium text-slate-400">
              © 2026 LaunchGate System
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                Backend Live
              </span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}