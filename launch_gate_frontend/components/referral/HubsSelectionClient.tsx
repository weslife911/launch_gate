"use client";

import { MessageCircle, ExternalLink, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WHATSAPP_HUBS } from "@/constants/hubs";
import { useTrackClickMutation } from "@/services/mutations/referralMutations";
import { useVerifyAmbassadorQuery } from "@/services/queries/authQueries";
import HubsUsernameLoading from "./HubsUsernameLoading";
import HubsFailedVerification from "./HubsFailedVerification";

interface HubsSelectionClientProps {
  username: string;
}

export default function HubsSelectionClient({ username }: HubsSelectionClientProps) {
  const { mutate: trackClick } = useTrackClickMutation();
  
  const { data: verification, isLoading } = useVerifyAmbassadorQuery(username);

  const handleJoin = (link: string, title: string) => {
    if (!verification?.success) {
        toast.error("Invalid referral session.");
        return;
    }
    
    trackClick(username);
    toast.success(`Redirecting to ${title}...`);
    
    setTimeout(() => {
      window.open(link, "_blank");
    }, 100);
  };

  if (isLoading) {
    return (
      <HubsUsernameLoading/>
    );
  }

  if (!verification?.success) {
    return (
      <HubsFailedVerification username={username} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0052ff] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
             <ShieldAlert className="w-4 h-4" /> Invited by @{username}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 italic tracking-tight">
            Choose Your <span className="text-[#0052ff]">LaunchGate Hub</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Join the official WhatsApp community for your niche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHATSAPP_HUBS.map((hub) => (
            <Card 
              key={hub.title} 
              className={`relative overflow-hidden group cursor-pointer border-2 border-transparent bg-white transition-all duration-300 shadow-sm ${hub.bg} ${hub.border} hover:shadow-xl hover:-translate-y-1`}
              onClick={() => handleJoin(hub.link, hub.title)}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${hub.accent.replace('text', 'bg')}`} />

              <CardHeader className="pt-8 px-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-white shadow-md border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                  <hub.icon className={`w-7 h-7 ${hub.accent}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-[#0052ff] transition-colors">
                  {hub.title}
                </CardTitle>
                <CardDescription className="text-slate-500 text-base leading-relaxed font-medium">
                  {hub.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-8 pt-4">
                <Button 
                  className="w-full h-12 bg-slate-900 group-hover:bg-[#0052ff] text-white font-black transition-all duration-300 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  Join Hub Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
                
                <p className="mt-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  Official Community
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm font-medium">
            Can't find your community? Contact our system administrators.
          </p>
        </div>
      </div>
    </div>
  );
}