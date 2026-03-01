import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Badge, Edit3, Fingerprint, Globe, Info, Mail, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


function EditProfileForm() {

    const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Form State initialized with user data
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    username: user?.username || "",
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
      toast.success("Identity Updated", {
        description: "Your changes have been synced with the Launchpad ecosystem.",
      });
    } catch (error: any) {
      toast.error("Update Failed", {
        description: error.response?.data?.username?.[0] || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10 animate-in fade-in zoom-in-95 duration-500">
      <form onSubmit={handleUpdate} className="space-y-6">
        
        {/* Main Configuration Card */}
        <Card className="border-slate-200 shadow-2xl shadow-blue-500/10 bg-white/80 backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-slate-900 italic">
                  Profile <span className="text-[#0052ff]">Configuration</span>
                </CardTitle>
                <p className="text-slate-500 text-sm font-medium">Update your digital ambassador footprint.</p>
              </div>
              <Badge className="bg-blue-100 text-[#0052ff] hover:bg-blue-100 border-none px-4 py-1.5 rounded-full font-bold">
                Level: Elite
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            
            {/* Essential Identity Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Full Legal Name
                </label>
                <div className="group relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#0052ff] transition-colors" />
                  <Input 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 rounded-2xl font-semibold focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0052ff] ml-1">
                  Ambassador Username
                </label>
                <div className="group relative">
                  <Fingerprint className="absolute left-4 top-3.5 h-5 w-5 text-[#0052ff]" />
                  <Input 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="pl-12 h-12 bg-blue-50/30 border-blue-100 rounded-2xl font-black text-[#0052ff] focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                    placeholder="unique_slug"
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic ml-1">* This changes your public referral link URL.</p>
              </div>
            </div>

            {/* Contact & Locked Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Primary Phone
                </label>
                <div className="group relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 transition-colors" />
                  <Input 
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="pl-12 h-12 bg-slate-50/50 border-slate-200 rounded-2xl font-semibold"
                    placeholder="+237 ..."
                  />
                </div>
              </div>

              <div className="space-y-3 opacity-60">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">
                  Registered Email (Locked)
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-300" />
                  <Input 
                    disabled
                    value={user?.email || ""}
                    className="pl-12 h-12 bg-slate-100 border-slate-200 rounded-2xl font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Geo-Location Section */}
            <div className="pt-6 border-t border-slate-100">
               <div className="flex items-center gap-2 mb-6">
                 <Globe className="h-4 w-4 text-[#0052ff]" />
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Regional Data</h4>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <Input 
                   placeholder="Country"
                   value={formData.country}
                   onChange={(e) => setFormData({...formData, country: e.target.value})}
                   className="h-11 bg-slate-50/50 rounded-xl border-slate-200"
                 />
                 <Input 
                   placeholder="Region"
                   value={formData.region}
                   onChange={(e) => setFormData({...formData, region: e.target.value})}
                   className="h-11 bg-slate-50/50 rounded-xl border-slate-200"
                 />
                 <Input 
                   placeholder="City"
                   value={formData.city}
                   onChange={(e) => setFormData({...formData, city: e.target.value})}
                   className="h-11 bg-slate-50/50 rounded-xl border-slate-200"
                 />
               </div>
            </div>

            {/* Alert Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-4 items-start">
              <Info className="h-5 w-5 text-[#0052ff] shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                Changing your <strong>Username</strong> will immediately break any old referral links you have shared. Make sure to update your social bios after saving.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button 
            type="button" 
            variant="ghost" 
            className="rounded-xl font-bold text-slate-500 hover:text-slate-900"
            onClick={() => window.history.back()}
          >
            Discard
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="h-14 px-10 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Push Changes
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
