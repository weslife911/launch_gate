"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Rocket, 
  Phone,
  ArrowRight 
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Yup Validation Schema for Fintech-level security
const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  memberInterest: Yup.string()
    .required("Please select your area of interest"),
});

export default function SignupPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      memberInterest: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      console.log("Onboarding data:", values);
      // Integration point for Django backend
      // After success, router.push("/auth/verify");
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#0052ff] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            LaunchGate
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md border-slate-200 shadow-xl bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-[#0052ff]" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-500">
            Join the automated scaling infrastructure for Launchpad
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="pl-10 h-11 border-slate-200 focus:border-[#0052ff]"
                  {...formik.getFieldProps("fullName")}
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-xs text-red-500 font-medium">{formik.errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 h-11 border-slate-200"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 font-medium">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="phone"
                  placeholder="+237 ..."
                  className="pl-10 h-11 border-slate-200"
                  {...formik.getFieldProps("phone")}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 font-medium">{formik.errors.phone}</p>
              )}
            </div>

            {/* Member Interest Selection */}
            <div className="space-y-2">
              <Label className="text-slate-700">Member Interest</Label>
              <Select
                onValueChange={(value) => formik.setFieldValue("memberInterest", value)}
              >
                <SelectTrigger className="h-11 border-slate-200">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <SelectValue placeholder="Select your interest hub" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nursing-health">Nursing / Health</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="academia">Academia</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.memberInterest && formik.errors.memberInterest && (
                <p className="text-xs text-red-500 font-medium">{formik.errors.memberInterest}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 border-slate-200"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 font-medium">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full h-11 bg-[#0052ff] hover:bg-[#0042cc] text-white font-semibold mt-6 transition-all"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500 font-medium">Already have an account? </span>
            <Link href="/login" className="text-[#0052ff] font-bold hover:underline">
              Login
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center gap-6">
            <div className="flex items-center gap-1.5 opacity-50">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Secure Data</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-50">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Auto-Routing</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}