"use client";

import { 
  Users, 
  UserCheck, 
  MapPin, 
  Globe, 
  Plus, 
  Download,
  Calendar as CalendarIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";

export default function DashboardPage() {
  // In a real app, you'd fetch this data from your Django API
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Stunning Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <div className="flex items-center gap-2 mt-1 text-slate-500">
            <CalendarIcon className="w-4 h-4" />
            <p className="text-sm font-medium">{currentDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 text-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-[#0052ff] hover:bg-[#0042cc] text-white shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4 mr-2" />
            New Ambassador
          </Button>
        </div>
      </div>

      {/* 2. Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Members"
          value="2,847"
          trend={12.5}
          trendLabel="vs last month"
          icon={Users}
        />
        <MetricCard
          title="Active Ambassadors"
          value="62"
          trend={8.2}
          trendLabel="vs last month"
          icon={UserCheck}
        />
        <MetricCard
          title="Regional Hubs"
          value="18"
          trend={2}
          trendLabel="new this quarter"
          icon={MapPin}
        />
        <MetricCard
          title="Global Opportunities"
          value="1,234"
          trend={-3.1}
          trendLabel="vs last week"
          icon={Globe}
        />
      </div>

      {/* 3. Analytics & Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Growth Chart takes 2/3 width on large screens */}
        <div className="xl:col-span-2">
          <GrowthChart />
        </div>

        {/* Recent Activity Table takes 1/3 width */}
        <div className="xl:col-span-1">
          <RecentActivityTable />
        </div>
      </div>

      {/* 4. System Status Footer (Optional) */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Global Opportunity Scraper is active: <span className="text-slate-900">42 new leads found today.</span>
          </p>
        </div>
        <Button variant="link" className="text-[#0052ff] text-sm font-bold h-auto p-0">
          View Log
        </Button>
      </div>
    </div>
  );
}