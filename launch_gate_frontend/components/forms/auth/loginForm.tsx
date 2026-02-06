"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, LogIn, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginMutation } from "@/services/mutations/authMutations";
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner";
import { loginReturnType } from "@/types/auth/authTypes";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {

  const loginMutation = useLoginMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async(values) => {
      await loginMutation.mutate(values, {
        onSuccess: (data: loginReturnType) => {
          if(data.success) {
            router.push("/dashboard");
          }
        }
      });
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-[#0052ff] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-900 tracking-tight">LaunchGate</span>
      </Link>

      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input {...formik.getFieldProps("email")} placeholder="name@company.com" className="pl-10 h-11" />
              </div>
              {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500">{formik.errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <Link href="/forgot-password" className="text-xs text-[#0052ff] font-semibold">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input {...formik.getFieldProps("password")} type="password" placeholder="••••••••" className="pl-10 h-11" />
              </div>
              {formik.touched.password && formik.errors.password && <p className="text-xs text-red-500">{formik.errors.password}</p>}
            </div>

            <Button disabled={loginMutation.isPending} type="submit" className="w-full h-11 bg-[#0052ff] hover:bg-[#0042cc]">
              {
                loginMutation.isPending ? <Spinner/> : <>
                  Sign In <LogIn className="ml-2 w-4 h-4" />
                </>
              }
            </Button>
          </form>
          <div className="text-center text-sm text-slate-500">
            New to LaunchGate? <Link href="/signup" className="text-[#0052ff] font-bold">Create an account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}