"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Rocket, 
  Globe, 
  Phone,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().min(10, "Message too short").required("Required"),
});

export default function ContactForm() {
  const formik = useFormik({
    initialValues: { name: "", email: "", subject: "", message: "" },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Message sent!");
    },
  });

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-16">
        
        {/* 2. Left Column: Information & Specific Icons */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 leading-[1.1]">
              Get in touch with our <span className="text-[#0052ff]">Global Hub.</span>
            </h1>
            <p className="text-lg text-slate-500">
              Whether you're an Ambassador or a Hub Lead, our automated support system routes your query to the right specialist instantly.
            </p>
          </div>

          {/* Icon Grid: Mail, Phone, MapPin, Globe */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#0052ff]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Email</h4>
                <p className="text-sm text-slate-500">support@launchgate.io</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Phone</h4>
                <p className="text-sm text-slate-500">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Office</h4>
                <p className="text-sm text-slate-500">Silicon Valley, CA</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#0052ff]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Global Hubs</h4>
                <p className="text-sm text-slate-500">18 Countries Active</p>
              </div>
            </div>
          </div>

          {/* Secondary CTA with MessageSquare & ArrowRight */}
          <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-bold">Community Chat</h4>
              </div>
              <p className="text-slate-400 text-sm">Join our private Slack for Ambassadors to get real-time strategy updates.</p>
              <Button variant="link" className="text-white p-0 h-auto font-bold group-hover:underline">
                Join Community <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Form with Send & CheckCircle2 */}
        <Card className="border-slate-200 shadow-2xl shadow-blue-500/5">
          <CardContent className="p-8 space-y-6">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input {...formik.getFieldProps("name")} className="h-12" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...formik.getFieldProps("email")} type="email" className="h-12" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea {...formik.getFieldProps("message")} className="min-h-35" placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full h-14 bg-[#0052ff] text-lg font-bold">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold">Average response time: 2 hours</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold">End-to-end encrypted communication</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}