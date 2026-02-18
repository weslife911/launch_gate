"use client";

import { Users, MessageCircle, TrendingUp, Copy, Rocket } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { GrowthChart } from "./GrowthChart";
import { useAuthStore } from "@/store/useAuthStore";
import { useReferralStore } from "@/store/useReferralStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReferralDataQuery } from "@/services/queries/referralQueries";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { referralCount } = useReferralStore();

  // Use v5 isPending
  const { isPending } = useReferralDataQuery();

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL;

  const referralLink = `${baseUrl}/join/${user?.username || "ambassador"}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!", {
      description: "Ready to share with your network."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground italic">
            Welcome, {user?.full_name || "Ambassador"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Public ID: <span className="text-[#0052ff] font-mono font-bold">{user?.username || "..."}</span>
          </p>
        </div>
        <Button onClick={copyLink} className="bg-[#0052ff] hover:bg-[#0041cc] shadow-lg shadow-blue-500/10">
          <Copy className="mr-2 h-4 w-4" />
          Copy Referral Link
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Referrals"
          value={referralCount}
          isLoading={isPending}
          icon={Users}
          trend={12.5}
          trendLabel="this month"
        />
        <MetricCard
          title="WhatsApp Clicks"
          value="--" // Calculated from ClickLog on backend
          isLoading={isPending}
          icon={MessageCircle}
        />
        <MetricCard
          title="Conversion Rate"
          value="Coming Soon"
          isLoading={isPending}
          icon={TrendingUp}
        />
        <MetricCard
          title="Ambassador Rank"
          value="Silver"
          isLoading={isPending}
          icon={Rocket}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <GrowthChart title="Traffic Analysis" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;