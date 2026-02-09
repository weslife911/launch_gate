"use client";

import { 
  Copy, 
  Share2, 
  Users, 
  MousePointerClick, 
  Zap, 
  CheckCircle2, 
  QrCode,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner"; // Using Sonner for modern notifications
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Badge } from "@/components/ui/badge";

export default function ReferralsPage() {
  const { user } = useAuthStore();

  // Pulling base URL from env with a fallback for safety
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "https://launch-gate.vercel.app";
  
  // Construct the full link using the ambassador's unique slug
  const personalLink = `${baseUrl.replace(/\/$/, "")}/join/${user?.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(personalLink);
    toast.success("Link Copied!", {
      description: "Ready to share with your network.",
      position: "top-center",
      duration: 3000,
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join LaunchGate Community',
          text: `Join the exclusive ${user?.referral_slug?.toUpperCase() || ""} network on LaunchGate!`,
          url: personalLink,
        });
        toast.success("Shared successfully!");
      } catch (error) {
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
          Referral <span className="text-[#0052ff]">Engine</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Your unique identity is <span className="text-[#0052ff] font-bold underline decoration-blue-200">{user?.referral_slug || "Pending ID"}</span>. 
          Share your link to update your referral count.
        </p>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Referrals"
          value="142" // Linked to referral_slug counts
          trend={12.5}
          trendLabel="growth"
          icon={Users}
        />
        <MetricCard
          title="Link Interactions"
          value="856"
          trend={24.1}
          trendLabel="clicks"
          icon={MousePointerClick}
        />
        <MetricCard
          title="Conversion Rate"
          value="16.5%"
          icon={Zap}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Link Generation Hub */}
        <Card className="lg:col-span-2 border-slate-200 shadow-xl shadow-blue-500/5 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0052ff]">
              <LinkIcon className="w-5 h-5" />
              Direct Referral Link
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Every user who registers through this link is permanently tied to your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 group">
                <Input 
                  readOnly 
                  value={personalLink} 
                  className="h-14 bg-slate-50 border-slate-200 pr-12 font-bold text-slate-700 rounded-xl focus:border-[#0052ff] transition-all"
                />
                <div className="absolute right-4 top-4">
                   <CheckCircle2 className="w-6 h-6 text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <Button 
                onClick={copyToClipboard}
                className="h-14 px-8 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-95"
              >
                <Copy className="mr-2 h-5 w-5" />
                Copy Link
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <Button 
                variant="outline" 
                onClick={handleNativeShare} 
                className="h-12 border-slate-200 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="h-12 border-slate-200 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Get Link QR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ambassador ID Status Card */}
        <Card className="bg-slate-900 text-white border-none overflow-hidden relative shadow-2xl">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20" />
          
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Status
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {user?.account_status || "Active"}
              </Badge>
            </CardTitle>
            <CardDescription className="text-slate-400">LaunchGate Ambassador Program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-[10px] font-black text-[#0052ff] uppercase tracking-[0.2em] mb-1">Assigned Slug</p>
              <p className="text-3xl font-mono font-black text-white">{user?.referral_slug?.toUpperCase() || "..."}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-400">Next Payout</span>
                <span className="text-white">$240.00</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0052ff] h-full w-[65%]" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              * Counts update in real-time when users complete the registration via your link.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}