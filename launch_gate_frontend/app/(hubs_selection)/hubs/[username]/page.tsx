"use client";

import { 
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WHATSAPP_HUBS } from "@/constants/hubs";

type Params = Promise<{ username: string }>;

export default async function HubsSelectionPage({ params }: { params: Params }) {
  const handleJoin = (link: string, title: string) => {
    toast.success(`Redirecting to ${title}...`);
    window.open(link, "_blank");
  };

  const { username } = await params;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Choose Your <span className="text-[#0052ff]">LaunchGate Hub</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Click any card below to join the official WhatsApp community for your niche.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHATSAPP_HUBS.map((hub) => (
            <Card 
              key={hub.title} 
              className={`relative overflow-hidden group cursor-pointer border-2 border-transparent bg-white transition-all duration-300 shadow-sm ${hub.bg} ${hub.border} hover:shadow-xl hover:-translate-y-1`}
              onClick={() => handleJoin(hub.link, hub.title)}
            >
              {/* Visual Indicator on Card Left */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${hub.accent.replace('text', 'bg')}`} />

              <CardHeader className="pt-8 px-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-white shadow-md border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                  <hub.icon className={`w-7 h-7 ${hub.accent}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-[#0052ff] transition-colors">
                  {hub.title}
                </CardTitle>
                <CardDescription className="text-slate-500 text-base leading-relaxed">
                  {hub.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-8 pt-4">
                <Button 
                  className="w-full h-12 bg-slate-900 group-hover:bg-[#0052ff] text-white font-bold transition-all duration-300 rounded-xl flex items-center justify-center gap-2"
                >
                  Join Hub Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
                
                <p className="mt-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  Official WhatsApp Community
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm">
            Can't find your community? Contact our system administrators.
          </p>
        </div>
      </div>
    </div>
  );
}