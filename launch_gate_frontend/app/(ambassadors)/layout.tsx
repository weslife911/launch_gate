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
            <header className="h-14 border-b border-border flex items-center px-4">
              <Skeleton className="h-6 w-32" />
            </header>
            <main className="p-6 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="grid grid-cols-4 gap-4">
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
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-lg font-semibold text-foreground italic">Ambassador Portal</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout;