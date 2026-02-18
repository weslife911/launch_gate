"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut, User } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Referrals", url: "/dashboard/referrals", icon: Users },
  { title: "Profile", url: "/dashboard/profile", icon: User }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { logoutUser } = useAuthStore();

  const handleLogout = () => {
    toast.promise(logoutUser(), {
      loading: 'Logging out...',
      success: 'Logged out successfully',
      error: 'Logout failed',
    });
  };

  return (
    // "side" prop ensures it knows where to slide from on mobile
    <Sidebar side="left" collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="font-bold text-[#0052ff] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0052ff] rounded flex items-center justify-center text-white">LG</div>
          <span className="truncate group-data-[collapsible=icon]:hidden">LaunchGate</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4", pathname === item.url ? "text-[#0052ff]" : "text-slate-400")} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}