"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
    User,
    Mail,
    ShieldCheck,
    MapPin,
    Edit3,
    Copy,
    UserCircle2,
    Fingerprint
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user } = useAuthStore();
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL || "";

    const initials = user?.full_name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "AM";

    const copySlug = () => {
        if (user?.username) {
            navigator.clipboard.writeText(`${baseUrl.replace(/\/$/, "")}/join/${user?.username}`);
            toast.success("Username copied!");
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Header Section */}
            <div className="relative h-32 w-full bg-linear-to-r from-[#0052ff] to-blue-800 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-2xl ring-4 ring-blue-50/50">
                        <AvatarFallback className="bg-linear-to-br from-slate-800 to-slate-900 text-white text-4xl font-black italic">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 pb-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
                                {user?.full_name || "Ambassador"}
                            </h1>
                            <Badge className="bg-[#0052ff] text-white hover:bg-[#0052ff] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                                Official Ambassador
                            </Badge>
                        </div>
                        <p className="text-slate-500 font-medium mt-1 flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {user?.city}, {user?.country}
                        </p>
                    </div>

                    <Button className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold shadow-sm mb-2">
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Identity Sidebar */}
                <Card className="border-slate-200 shadow-xl shadow-blue-500/5 bg-white">
                    <CardHeader className="pb-2">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Fingerprint className="h-4 w-4 text-[#0052ff]" /> Digital ID
                        </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Referral Slug</p>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-lg font-black text-[#0052ff]">{baseUrl.replace(/\/$/, "")}/join/${user?.username}</span>
                                <Button variant="ghost" size="icon" onClick={copySlug} className="h-8 w-8 text-slate-400 hover:text-[#0052ff]">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Account Status</span>
                                <span className="text-green-600 font-bold flex items-center gap-1">
                                    <ShieldCheck className="h-4 w-4" /> Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Member Level</span>
                                <span className="font-bold text-slate-700 italic">Elite Ambassador</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Grid */}
                <Card className="md:col-span-2 border-slate-200 shadow-xl shadow-blue-500/5 bg-white">
                    <CardHeader className="border-b border-slate-50">
                        <h3 className="text-lg font-bold text-slate-800">Account Credentials</h3>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <UserCircle2 className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Full Name</span>
                                </div>
                                <p className="text-slate-700 font-semibold border-b border-slate-100 pb-2">{user?.full_name}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Email Address</span>
                                </div>
                                <p className="text-slate-700 font-semibold border-b border-slate-100 pb-2">{user?.email}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">System Role</span>
                                </div>
                                <p className="text-slate-700 font-semibold border-b border-slate-100 pb-2">Launchpad Ambassador</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <User className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Login Username</span>
                                </div>
                                <p className="text-slate-700 font-semibold border-b border-slate-100 pb-2">{user?.username}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}