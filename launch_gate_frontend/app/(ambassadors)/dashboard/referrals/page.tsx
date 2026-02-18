"use client";

import { useState } from "react";
import {
  Copy,
  Share2,
  CheckCircle2,
  QrCode,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react"; // Import QR library

export default function ReferralsPage() {
  const { user } = useAuthStore();
  const [showQR, setShowQR] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL || "";
  const personalLink = `${baseUrl.replace(/\/$/, "")}/join/${user?.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(personalLink);
    toast.success("Link Copied!", {
      description: "Ready to share with your network.",
      position: "top-center",
    });
  };

  // Universal Share Function
  const handleShare = async (platform?: string) => {
    const shareData = {
      title: 'Join LaunchGate Community',
      text: `Join the exclusive ${user?.username?.toUpperCase() || ""} network on LaunchGate!`,
      url: personalLink,
    };

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + personalLink)}`, '_blank');
      return;
    }

    // Native Share for Mobile/Supported Browsers
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Opened share menu");
      } catch (error) {
        if ((error as Error).name !== 'AbortError') copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
          Referral <span className="text-[#0052ff]">Engine</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Your unique identity is <span className="text-[#0052ff] font-bold underline decoration-blue-200">{user?.referral_slug || "Pending ID"}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-slate-200 shadow-xl shadow-blue-500/5 bg-white relative overflow-hidden">
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
              <Input
                readOnly
                value={personalLink}
                className="h-14 bg-slate-50 border-slate-200 font-bold text-slate-700 rounded-xl"
              />
              <Button
                onClick={copyToClipboard}
                className="h-14 px-8 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-xl shadow-lg shadow-blue-500/30"
              >
                <Copy className="mr-2 h-5 w-5" />
                Copy
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              {/* Native Share Button */}
              <Button
                variant="outline"
                onClick={() => handleShare()}
                className="h-12 border-slate-200 font-bold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Any App
              </Button>

              {/* Specific WhatsApp Button */}
              <Button
                variant="outline"
                onClick={() => handleShare('whatsapp')}
                className="h-12 border-slate-200 font-bold text-slate-700 hover:bg-green-50 rounded-xl"
              >
                <span className="mr-2">📲</span>
                WhatsApp
              </Button>

              {/* QR Code Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowQR(!showQR)}
                className={`h-12 border-slate-200 font-bold rounded-xl transition-colors ${showQR ? 'bg-blue-600 text-white' : 'text-slate-700'}`}
              >
                <QrCode className="mr-2 h-4 w-4" />
                {showQR ? "Hide QR" : "Show QR"}
              </Button>
            </div>

            {/* QR Code Display Area */}
            {showQR && (
              <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 animate-in fade-in zoom-in duration-300">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <QRCodeSVG
                    value={personalLink}
                    size={180}
                    includeMargin={true}
                    level={"H"} // High error correction
                  />
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Scan to join the network</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}