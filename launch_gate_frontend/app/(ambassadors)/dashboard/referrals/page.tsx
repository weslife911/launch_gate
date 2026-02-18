"use client";

import {
  Copy,
  Share2,
  CheckCircle2,
  QrCode,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner"; // Using Sonner for modern notifications
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReferralsPage() {
  const { user } = useAuthStore();

  // Pulling base URL from env with a fallback for safety
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL as string;

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

      </div>
    </div>
  );
}