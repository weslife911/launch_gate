"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Mail, 
  Search, 
  ArrowLeft, 
  Rocket, 
  Loader2,
  AlertCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Validation Schema
const verifyEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required to reset password"),
});

export default function VerifyEmailPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyEmailSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        // Logic: Call your Django backend here to check if email exists
        // const response = await api.post('/auth/check-email/', values);
        
        console.log("Checking email existence:", values.email);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // If success:
        router.push(`/auth/otp?email=${encodeURIComponent(values.email)}&type=reset`);
        
      } catch (error) {
        setServerError("No account found with this email address.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#0052ff] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            LaunchGate
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md border-slate-200 shadow-xl bg-white overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-[#0052ff]" />
        
        <CardHeader className="text-center pb-4">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-[#0052ff]" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Verify Email
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter your email to receive a password reset code
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {serverError && (
            <Alert variant="destructive" className="mb-6 bg-red-50 border-red-100 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs font-medium">
                {serverError}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 h-12 border-slate-200 focus:ring-[#0052ff]"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-[#0052ff] hover:bg-[#0042cc] text-white font-bold text-base transition-all shadow-lg shadow-blue-200"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-[#0052ff] transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer info */}
      <p className="mt-8 text-sm text-slate-400 text-center max-w-xs">
        If you don't have access to your email, please contact our 
        <span className="text-[#0052ff] font-semibold cursor-pointer ml-1">Support Team</span>.
      </p>
    </div>
  );
}