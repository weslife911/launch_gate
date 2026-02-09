"use client";

import { Users, Link as LinkIcon, MessageCircle, TrendingUp, Copy, Rocket } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { GrowthChart } from "./GrowthChart";
import { RecentActivityTable } from "./RecentActivityTable";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Using Sonner instead of deprecated toast

const Dashboard = () => {
  const { user } = useAuthStore();
  const referralLink = `https://launchgate.com/join/${user?.referral_slug || "your-slug"}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!", {
      description: "You can now share this with your network.",
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground italic">Welcome, {user?.full_name || "Ambassador"}</h2>
          <p className="text-muted-foreground mt-1">
            Tracking your impact via slug: <span className="text-[#0052ff] font-mono font-bold uppercase">{user?.referral_slug || "..."}</span>
          </p>
        </div>
        <Button onClick={copyLink} className="bg-[#0052ff] hover:bg-[#0041cc] shadow-lg shadow-blue-500/20">
          <Copy className="mr-2 h-4 w-4" />
          Copy Referral Link
        </Button>
      </div>

      {/* Ambassador Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Referrals"
          value="142"
          trend={15.2}
          trendLabel="signups"
          icon={Users}
        />
        <MetricCard
          title="WhatsApp Clicks"
          value="856"
          trend={24.1}
          trendLabel="taps"
          icon={MessageCircle}
        />
        <MetricCard
          title="Conversion Rate"
          value="16.5%"
          trend={2.4}
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Rewards"
          value="$240"
          trendLabel="pending"
          icon={Rocket}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GrowthChart title="Clicks vs. Registrations" />
        <RecentActivityTable title="Your Recent Referrals" />
      </div>
    </div>
  );
};

export default Dashboard;