"use client";

import {
  Download,
  Calendar as CalendarIcon,
  Copy,
  Users,
  MessageCircle,
  TrendingUp,
  Rocket,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { useAuthStore } from "@/store/useAuthStore";
import { useReferralStore } from "@/store/useReferralStore";
import { useReferralDataQuery, useReferralChartQuery } from "@/services/queries/referralQueries";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { referralCount, chartData } = useReferralStore();

  // Trigger queries to ensure data is fresh in the store
  const referralData = useReferralDataQuery();
  const chartQuery = useReferralChartQuery();

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL;

  const referralLink = `${baseUrl}/join/${user?.username || "ambassador"}`;

  // --- DOWNLOAD CSV LOGIC ---
  const handleExport = () => {
    if (!chartData || chartData.length === 0) {
      toast.error("No data available to export", {
        description: "Wait for the chart to load or generate some traffic first."
      });
      return;
    }

    try {
      // 1. Define CSV Headers
      const headers = ["Date", "Clicks"];

      // 2. Map data to CSV rows
      const rows = chartData.map(item => `${item.date},${item.clicks}`);

      // 3. Combine headers and rows
      const csvContent = [headers.join(","), ...rows].join("\n");

      // 4. Create a blob and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.setAttribute("href", url);
      link.setAttribute("download", `${user?.full_name}_referral_stats_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export successful", {
        description: "Your referral report has been downloaded."
      });
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Export failed", {
        description: "An error occurred while generating your report."
      });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied!", {
      description: "Share this to track your new referrals.",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* 1. Stunning Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground tracking-tight italic">
            System Overview
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md text-xs font-medium border border-border">
              <CalendarIcon className="w-3.5 h-3.5" />
              {currentDate}
            </div>
            <div className="text-xs font-mono text-[#0052ff] bg-blue-500/10 px-2 py-1 rounded-md font-bold border border-blue-500/20">
              USER: {user?.username}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={copyLink}
            className="bg-[#0052ff] hover:bg-[#0041cc] text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Referral Link
          </Button>

          {/* UPDATED DOWNLOAD BUTTON */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleExport}
            title="Download Report (CSV)"
            className="hidden sm:flex border-border bg-card text-muted-foreground hover:text-[#0052ff] hover:border-[#0052ff] transition-colors"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Referrals"
          value={referralCount}
          isLoading={referralData.isPending}
          icon={Users}
          trend={12.5}
          trendLabel="vs last month"
        />
        <MetricCard
          title="Hub Interactions"
          value={chartData?.reduce((acc, curr) => acc + curr.clicks, 0) || 0}
          isLoading={chartQuery.isPending}
          icon={MessageCircle}
          trend={8.2}
        />
        <MetricCard
          title="Conversion"
          value="Calculated"
          isLoading={referralData.isPending}
          icon={TrendingUp}
        />
        <MetricCard
          title="Program Status"
          value={user?.account_status?.replace('_', ' ') || "Active"}
          isLoading={referralData.isPending}
          icon={Rocket}
        />
      </div>

      {/* 3. Analytics & Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-112.5">
          <GrowthChart title="Traffic Analysis" />
        </div>

        <div className="xl:col-span-1 bg-card/50 border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#0052ff]" />
          </div>
          <Button variant="link" className="text-[#0052ff]">
            View Insights
          </Button>
        </div>
      </div>
    </div>
  );
}