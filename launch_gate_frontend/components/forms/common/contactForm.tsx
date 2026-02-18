"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Mail, 
  Send, 
  Rocket, 
  Globe, 
  CheckCircle2,
  MapPin,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useContactMutation } from "@/services/mutations/contactMutation";
import { Spinner } from "@/components/ui/spinner";

const contactSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().min(10, "Message too short").required("Required"),
});

export default function ContactForm() {
  const { user } = useAuthStore();
  const contactMutation = useContactMutation();

  const formik = useFormik({
    // Dynamically set initial values based on user presence
    initialValues: { 
      name: user?.full_name || "", 
      email: user?.email || "", 
      subject: "", 
      message: "" 
    },
    // Allows form to update if user data loads late
    enableReinitialize: true, 
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      await contactMutation.mutate(values);
    },
  });

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Get in touch with the <span className="text-[#0052ff]">Experts</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg">
                Have a question about the Ambassador program or regional hubs? Our team is here to help you scale your impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0052ff]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900">Email Us</h3>
                  <p className="text-sm text-slate-500">mfonfuwesley@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0052ff]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900">Visit Us</h3>
                  <p className="text-sm text-slate-500">Bamenda, NorthWest Region, CM</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#0052ff] transition-colors">
                  <Globe className="w-5 h-5 text-slate-400 group-hover:text-[#0052ff]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Support</p>
                  <p className="text-slate-900 font-semibold">Available 24/7 for Ambassadors</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#0052ff] transition-colors">
                  <Rocket className="w-5 h-5 text-slate-400 group-hover:text-[#0052ff]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Assistance</p>
                  <p className="text-slate-900 font-semibold">Scale your local community hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Full Name</Label>
                <Input 
                  {...formik.getFieldProps("name")} 
                  className="h-14 bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                  placeholder="John Doe" 
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-red-500 font-medium ml-1">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Email Address</Label>
                <Input 
                  {...formik.getFieldProps("email")} 
                  type="email" 
                  className="h-14 bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                  placeholder="john@example.com" 
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500 font-medium ml-1">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Subject</Label>
                <Input 
                  {...formik.getFieldProps("subject")} 
                  className="h-14 bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                  placeholder="How can we help?" 
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-xs text-red-500 font-medium ml-1">{formik.errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Message</Label>
                <Textarea 
                  {...formik.getFieldProps("message")} 
                  className="min-h-40 bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl resize-none" 
                  placeholder="Tell us more about your inquiry..." 
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-xs text-red-500 font-medium ml-1">{formik.errors.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={formik.isSubmitting || contactMutation.isPending}
                className="w-full h-16 bg-[#0052ff] hover:bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                {formik.isSubmitting || contactMutation.isPending ? <Spinner/> : <>
                Send Message
                <Send className="ml-2 w-5 h-5" />
                </>} 
              </Button>
            </form>

            <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Average response time: 2 hours</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">End-to-end encrypted communication</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}