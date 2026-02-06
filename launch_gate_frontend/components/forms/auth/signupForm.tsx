"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  User, Mail, Phone, Globe, MapPin, 
  Lock, LayoutGrid, AlertCircle, ArrowRight 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSignupMutation } from "@/services/mutations/authMutations";
import { Spinner } from "@/components/ui/spinner";

// Validation Schema matching models.py requirements
const signupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  full_name: Yup.string().optional(),
  phone_number: Yup.string().optional(),
  country: Yup.string().optional(),
  region: Yup.string().optional(),
  city: Yup.string().optional(),
  niches: Yup.array().min(1, "Select at least one niche").required("Niche selection is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default function SignupPage() {
  const router = useRouter();
  const signupMutation = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      full_name: "",
      phone_number: "",
      country: "",
      region: "",
      city: "",
      niches: [], // Matches ManyToMany relationship
      password: "",
      confirm_password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      
      signupMutation.mutate(values, {
        onSuccess: (data) => {
          if(data.success) {
            router.push("/dashboard")
          }
        }
      });
    },
  });

  // Reusable Error Component for Formik
  const ErrorMsg = ({ name }: { name: keyof typeof formik.values }) => (
    formik.touched[name] && formik.errors[name] ? (
      <div className="flex items-center gap-1 text-xs text-destructive mt-1">
        <AlertCircle className="w-3 h-3" />
        <span>{formik.errors[name] as string}</span>
      </div>
    ) : null
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-slate-200 shadow-xl bg-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join LaunchGate infrastructure</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="username" className="pl-10" {...formik.getFieldProps("username")} />
              </div>
              <ErrorMsg name="username" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="email" type="email" className="pl-10" {...formik.getFieldProps("email")} />
              </div>
              <ErrorMsg name="email" />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="full_name" className="pl-10" {...formik.getFieldProps("full_name")} />
              </div>
              <ErrorMsg name="full_name" />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="phone_number" className="pl-10" {...formik.getFieldProps("phone_number")} />
              </div>
              <ErrorMsg name="phone_number" />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="country" className="pl-10" {...formik.getFieldProps("country")} />
              </div>
              <ErrorMsg name="country" />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="city" className="pl-10" {...formik.getFieldProps("city")} />
              </div>
              <ErrorMsg name="city" />
            </div>

            {/* Niche Selection - Matching Exact NICHE_CHOICES */}
            <div className="space-y-2 md:col-span-2">
              <Label>Primary Niche Focus</Label>
              <div className="relative">
                <LayoutGrid className="absolute left-3 top-3 z-10 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Select onValueChange={(val) => formik.setFieldValue("niches", [val])}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="writing">Writing, Cultural & Creative Arts</SelectItem>
                    <SelectItem value="science">Science, Technology & Engineering</SelectItem>
                    <SelectItem value="academia">Academia & Scholarships</SelectItem>
                    <SelectItem value="health">Health, Medicine & Nursing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ErrorMsg name="niches" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="password" type="password" className="pl-10" {...formik.getFieldProps("password")} />
              </div>
              <ErrorMsg name="password" />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Input id="confirm_password" type="password" className="pl-10" {...formik.getFieldProps("confirm_password")} />
              </div>
              <ErrorMsg name="confirm_password" />
            </div>

            <Button 
              type="submit" 
              className="md:col-span-2 w-full h-11 bg-[#0052ff] hover:bg-[#0041cc] text-white"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? <Spinner /> : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}