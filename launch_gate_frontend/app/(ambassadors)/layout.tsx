"use client"

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/useAuthStore'
import { ReactNode, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Skeleton } from '@/components/ui/skeleton';
import { useCheckAuthQuery } from '@/services/queries/authQueries'

function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const { isPending } = useCheckAuthQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.push("/");
    }
  }, [isPending, isAuthenticated, router]);

  // Global Skeleton Layout while checking Auth
  if (isPending) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <div className="w-64 border-r border-border p-6 space-y-6 hidden md:block">
            <Skeleton className="h-10 w-40" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <header className="h-20 border-b border-border flex items-center px-4">
              <Skeleton className="h-8 w-32" />
            </header>
            <main className="p-6 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
              <Skeleton className="h-80 w-full" />
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Enhanced Mobile-Optimized Header */}
          <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 sticky top-0 z-40 transition-all">
            <div className="flex items-center gap-4 w-full">

              {/* Bigger & Styled Sidebar Trigger for Mobile */}
              <div className="p-1 bg-slate-100/80 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-200 transition-colors md:hidden">
                <SidebarTrigger className="h-10 w-10 text-[#0052ff] scale-125" />
              </div>

              {/* Responsive Title Section */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="md:hidden font-black text-[#0052ff] text-xl">LG</span>
                  <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight italic">
                    Ambassador <span className="text-[#0052ff]">Portal</span>
                  </h1>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 md:hidden">
                  LaunchGate Ecosystem
                </p>
              </div>

            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout;