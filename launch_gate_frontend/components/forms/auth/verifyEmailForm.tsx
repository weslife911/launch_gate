"use client";

import { MailCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmailVerificationForm() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl text-center">
        <CardHeader>
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <MailCheck className="w-10 h-10 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-base pt-2 text-slate-500">
            We've sent a verification link to <span className="font-bold text-slate-900">wesley@launchpad.com</span>. 
            Click the link to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-8 space-y-4">
          <Button className="w-full h-12 bg-[#0052ff] font-bold text-lg shadow-lg shadow-blue-200">
            Open Email App <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-slate-400">
            Didn't receive it? <button className="text-[#0052ff] font-bold hover:underline">Click to resend</button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}