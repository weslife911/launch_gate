"use client";

import React from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function OTPForm() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl text-center">
        <CardHeader>
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-[#0052ff]" />
          </div>
          <CardTitle className="text-2xl font-bold">Two-Step Verification</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className="w-12 h-14 text-lg border-slate-200" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full h-11 bg-[#0052ff]">Verify Code</Button>
          <button className="text-sm text-slate-500 flex items-center justify-center gap-2 mx-auto hover:text-[#0052ff]">
            <RefreshCw className="w-4 h-4" /> Resend Code
          </button>
        </CardContent>
      </Card>
    </div>
  );
}