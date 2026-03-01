import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Badge, Fingerprint, Globe, Info, Mail, Phone, Save, User, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProfileForm() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    country: user?.country || "",
    region: user?.region || "",
    city: user?.city || "",
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      toast.success("Profile Updated", {
        description: "Your information has been synced successfully.",
      });
    } catch (error: any) {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10 animate-in fade-in zoom-in-95 duration-500">
      <form onSubmit={handleUpdate} className="space-y-6">
        <Card className="border-slate-200 shadow-2xl shadow-blue-500/10 bg-white/80 backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-slate-900 italic">
                  Profile <span className="text-[#0052ff]">Configuration</span>
                </CardTitle>
                <p className="text-slate-500 text-sm font-medium">Update your ambassador identity.</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Username - LOCKED */}
              <div className="space-y-3 opacity-80">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Ambassador ID (Locked)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-300" />
                  <Input 
                    disabled 
                    value={user?.username || ""} 
                    className="pl-12 h-12 bg-slate-100 border-slate-200 rounded-2xl font-black text-slate-400 cursor-not-allowed" 
                  />
                </div>
              </div>

              {/* Full Name - EDITABLE */}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Legal Name</label>
                <div className="group relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#0052ff]" />
                  <Input 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 rounded-2xl font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input 
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 rounded-2xl font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-3 opacity-60">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Email (Fixed)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-300" />
                  <Input disabled value={user?.email || ""} className="pl-12 h-12 bg-slate-100 rounded-2xl cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
               <div className="flex items-center gap-2 mb-6 text-[#0052ff]">
                 <Globe className="h-4 w-4" />
                 <h4 className="text-[11px] font-black uppercase tracking-widest">Location Data</h4>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <Input placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="h-11 bg-slate-50/50 rounded-xl" />
                 <Input placeholder="Region" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="h-11 bg-slate-50/50 rounded-xl" />
                 <Input placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="h-11 bg-slate-50/50 rounded-xl" />
               </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-4 items-start">
              <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Your <strong>Username</strong> and <strong>Email</strong> cannot be changed once the account is verified to ensure link stability.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => window.history.back()} className="rounded-xl font-bold">Discard</Button>
          <Button type="submit" disabled={loading} className="h-14 px-10 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
            {loading ? "Saving..." : <><Save className="mr-2 h-5 w-5" /> Push Changes</>}
          </Button>
        </div>
      </form>
    </div>
  );
}