import { ArrowLeft, ShieldAlert, UserX } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button";

function HubsFailedVerification({ username }: {
    username: string
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center">
            <UserX className="w-12 h-12 text-red-500" />
            <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">
              AMBASSADOR <span className="text-red-600">NOT FOUND</span>
            </h1>
            <p className="text-slate-500 leading-relaxed font-medium">
                The referral link you followed appears to be invalid or the ambassador <span className="text-slate-900 font-bold">@{username}</span> does not exist in our system.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Possible Reasons</h4>
            <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">• The username was recently changed</li>
                <li className="flex items-center gap-2">• The link was typed incorrectly</li>
                <li className="flex items-center gap-2">• The account has been deactivated</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button className="w-full h-14 bg-[#0052ff] hover:bg-[#0041cc] text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                Go to Homepage
              </Button>
            </Link>
            <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-slate-500 font-bold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>
        </div>
      </div>
  )
}

export default HubsFailedVerification
