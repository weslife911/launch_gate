"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { MapPin, Edit3, Fingerprint } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user } = useAuthStore();
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL || "";
    const router = useRouter();

    const initials = user?.full_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "AM";

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="relative h-32 w-full bg-linear-to-r from-[#0052ff] to-blue-800 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-2xl ring-4 ring-blue-50/50">
                        <AvatarFallback className="bg-slate-900 text-white text-4xl font-black italic">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 pb-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">
                                {user?.full_name}
                            </h1>
                            <Badge className="bg-[#0052ff]/10 text-[#0052ff] border-none px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                                Verified Ambassador
                            </Badge>
                        </div>
                        <p className="text-slate-500 font-medium mt-1 flex items-center gap-1 italic">
                            <MapPin className="h-4 w-4" /> {user?.city || "N/A"}, {user?.country || "Earth"}
                        </p>
                    </div>

                    <Button onClick={() => router.push("/dashboard/profile/edit")} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold mb-2">
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-slate-200 bg-white">
                    <CardHeader className="pb-2">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Fingerprint className="h-4 w-4 text-[#0052ff]" /> Portal Identity
                        </h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Your Referral Link</p>
                            <p className="text-sm font-black text-[#0052ff] mt-1 break-all">
                                {baseUrl}/join/{user?.username}
                            </p>
                        </div>
                        <div className="pt-2 text-xs text-slate-400 font-medium italic">
                            * Username is fixed to prevent broken referral links.
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-slate-200 bg-white shadow-sm">
                    <CardHeader className="border-b border-slate-50 px-8 py-6">
                        <h3 className="text-lg font-black text-slate-900 italic">Account Credentials</h3>
                    </CardHeader>
                    <CardContent className="px-8 py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ambassador ID</span>
                                <p className="font-bold text-slate-900 border-b pb-2">@{user?.username}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Contact</span>
                                <p className="font-bold text-slate-900 border-b pb-2">{user?.phone_number || "Not set"}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Email</span>
                                <p className="font-bold text-slate-900 border-b pb-2">{user?.email}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Permission</span>
                                <p className="font-bold text-slate-900 border-b pb-2 uppercase tracking-tighter">Level: Ambassador</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}